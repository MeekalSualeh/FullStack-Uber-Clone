const { userSignupSchema, userLoginSchema } = require("../services/validation.services")
const { hashPassword, verifyPassword } = require("../services/password.services")
const { makeJWTKey } = require("../services/jwt.services")
const { setCookie, removeCookie } = require("../services/cookies.services")
const cache = require("../services/cache.services")
const userModel = require("../models/user.model")

const handleUserLogin = async (req, res) =>{

    if(!req.body.email || !req.body.password){
        return res.status(400).json({ error: "All fields are required" })
    }

    const result = userLoginSchema.safeParse(req.body)

    if(result.error){
        return res.status(400).json({error: result.error.issues[0].message})
    }

    const { email, password } = result.data;
    
    try {
        let user = await userModel.findOne({ email }).select(`+password`)
        
        if(!user){
            return res.status(400).json({ error: "Email or Password is incorrect" })
        }

        if(user.status === "online"){
            return res.status(400).json({ error: "Account is opened somewhere else" })
        }

        const isPasswordSame = await verifyPassword(password, user.password)

        if(!isPasswordSame){
            return res.status(400).json({ error: "Email or Password is incorrect"})
        }

        // const accessToken = makeJWTKey(user._id, "USER", 180)    
        // const refreshToken = makeJWTKey(user._id, "USER", 360)
        const accessToken = makeJWTKey(user._id, "USER", 1200)    
        const refreshToken = makeJWTKey(user._id, "USER", 2400)
        
        user.refreshToken = refreshToken;
        await user.save();

        // setCookie(res, "accessToken", accessToken, 180000)
        // setCookie(res, "refreshToken", refreshToken, 360000)
        setCookie(res, "accessToken", accessToken, 1200000)
        setCookie(res, "refreshToken", refreshToken, 2400000)
        
        user = user.toObject();
        delete user.password;
        cache.set(`user:${user._id.toString()}`, user)

        return res.status(201).json({ success: true, accessToken, refreshToken })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

const handleUserSignup = async (req, res) =>{

    if(!req.body.firstname || !req.body.email || !req.body.password){
        return res.status(400).json({ error: "All fields are required except lastname" })
    }

    const result = userSignupSchema.safeParse(req.body)

    if(result.error){
        return res.status(400).json({ error: result.error.issues[0].message })
    }

    const { firstname, lastname, email, password } = result.data

    try {
        const existingUser = await userModel.findOne({ email })

        if(existingUser){
            return res.status(400).json({ error: "User already exist" })
        }

        const hashedPassword = await hashPassword(password)

        let user = await userModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        const accessToken = makeJWTKey(user._id, "USER", 180)    
        const refreshToken = makeJWTKey(user._id, "USER", 360)       

        user.refreshToken = refreshToken;
        await user.save();

        setCookie(res, "accessToken", accessToken, 180000)
        setCookie(res, "refreshToken", refreshToken, 360000)

        user = user.toObject();
        delete user.password;
        cache.set(`user:${user._id.toString()}`, user)

        return res.status(201).json({ success: true, accessToken, refreshToken })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

const handleUserLogout = async (req, res) =>{

    if(!req.userId){
        return res.status(400).json({ error: "No such user exists" })
    }

    try {
        const user = await userModel.findByIdAndUpdate(req.userId, {$unset: {"refreshToken": ""}, status: "offline"})

        if(!user){
            return res.status(400).json({ error: "No such user exists" })
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
    handleUserLogin,
    handleUserSignup,
    handleUserLogout,
}

// rides array ko select false karna

/*
error
redirect
*/