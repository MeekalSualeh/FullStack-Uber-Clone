const captainModel = require("../models/captain.model")
const { userLoginSchema, captainSignupSchema } = require("../services/validation.services")
const { hashPassword, verifyPassword } = require("../services/password.services")
const { makeJWTKey } = require("../services/jwt.services")
const { setCookie, removeCookie } = require("../services/cookies.services")
const cache = require("../services/cache.services")

const handleCaptainLogin = async (req, res) =>{

    if(!req.body.email || !req.body.password){
        return res.status(400).json({ error: "All fields are required" })
    }

    const result = userLoginSchema.safeParse(req.body)

    if(result.error){
        return res.status(400).json({error: result.error.issues[0].message})
    }

    const { email, password } = result.data;
    
    try {
        let user = await captainModel.findOne({ email }).select(`+password`)

        if(!user){
            return res.status(400).json({ error: "Email or Password is invalid" })
        }

        if(user.status === "online"){
            return res.status(400).json({ error: "Account is opened somewhere else" })
        }

        const isPasswordSame = await verifyPassword(password, user.password)

        if(!isPasswordSame){
            return res.status(400).json({ error: "Email or Password is invalid" })
        }

        // const accessToken = makeJWTKey(user._id, "CAPTAIN", 180)    
        // const refreshToken = makeJWTKey(user._id, "CAPTAIN", 360)
        const accessToken = makeJWTKey(user._id, "CAPTAIN", 1200)    
        const refreshToken = makeJWTKey(user._id, "CAPTAIN", 2400)     

        user.refreshToken = refreshToken;
        await user.save();

        // setCookie(res, "accessToken", accessToken, 180000)
        // setCookie(res, "refreshToken", refreshToken, 360000)
        setCookie(res, "accessToken", accessToken, 1200000)
        setCookie(res, "refreshToken", refreshToken, 2400000)
        
        user = user.toObject();
        delete user.password
        delete user.refreshToken
        cache.set(`user:${user._id.toString()}`, user)

        return res.status(200).json({ success: true, refreshToken, accessToken })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

const handleCaptainSignup = async (req, res) =>{

    if(!req.body.firstname || !req.body.email || !req.body.password || !req.body.type || !req.body.color || !req.body.plate || !req.body.capacity ){
        return res.status(400).json({ error: "All fields are required except lastname" })
    }

    const result = captainSignupSchema.safeParse(req.body)

    if(result.error){
        return res.status(400).json({ error: result.error.issues[0].message })
    }

    const { firstname, lastname, email, password, type, color, plate, capacity} = result.data

    try {
        const existingUser = await captainModel.findOne({ email })

        if(existingUser){
            return res.status(400).json({ error: "Captain already exists" })
        }

        const hashedPassword = await hashPassword(password)

        let user = await captainModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            vehicle:{
                type,
                plate,
                color,
                capacity
            }
        })

        const accessToken = makeJWTKey(user._id, "CAPTAIN", 180)    
        const refreshToken = makeJWTKey(user._id, "CAPTAIN", 360)       

        user.refreshToken = refreshToken;
        await user.save();

        setCookie(res, "accessToken", accessToken, 180000)
        setCookie(res, "refreshToken", refreshToken, 360000)

        user = user.toObject();
        delete user.password;
        cache.set(`user:${user._id.toString()}`, user)

        return res.status(201).json({ success: true, refreshToken, accessToken })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

const handleCaptainLogout = async (req, res) =>{

    if(!req.userId){
        return res.status(400).json({ error: "Captain doesn't exist" })
    }

    try {
        let user = await captainModel.findByIdAndUpdate(req.userId, {$unset: {"refreshToken": ""}, status: "offline"})

        if(!user){
            return res.status(400).json({ error: "Captain doesn't exist" })
        }

        cache.del(`user:${user._id.toString()}`) // 3min
        removeCookie(res, "accessToken")
        removeCookie(res, "refreshToken")

        return res.status(200).json({ success: true })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    handleCaptainLogin,
    handleCaptainSignup,
    handleCaptainLogout
}