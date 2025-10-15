const userModel = require("../models/user.model")
const captainModel = require("../models/captain.model")
const rideModel = require("../models/ride.model")
const chatModel = require("../models/chat.model")
const { makeJWTKey, verifyJWTKey } = require("../services/jwt.services")
const { removeCookie, setCookie } = require("../services/cookies.services")
const cookie = require("cookie")
const cache = require("../services/cache.services")

let userIdToSocketId = new Map()

const authenticateUser = async (req, res, next) =>{
    const { accessToken } = req.cookies;
    let user, model;

    if(accessToken){
        try {
        const accessTokenData = verifyJWTKey(accessToken)
        
        if(accessTokenData){
            
                if(cache.has(`user:${accessTokenData._id}`)){
                    user = cache.get(`user:${accessTokenData._id.toString()}`)

                }else{

                    model = accessTokenData.role.toUpperCase() === "CAPTAIN" ? captainModel: userModel
                    user = await model.findById(accessTokenData._id)

                    if(user){                        
                        cache.set(`user:${user._id.toString()}`, user.toObject())
                    }
                }
                
                if(user){
                    req.userId = user._id;
                    req.role = accessTokenData.role
                    const newAccessToken = makeJWTKey(user._id, accessTokenData.role, 180)
                    setCookie(res, "accessToken", newAccessToken, 180000)

                    return next();
                }
            }

            removeCookie(res, "accessToken");
            
        } catch (error) {
            console.log(error);
            removeCookie(res, "accessToken");
            return res.status(401).json({ error: error.message, redirect: true })
        }
    }
    
    const { refreshToken } = req.cookies

    if(!refreshToken){
        return res.status(401).json({error: "Refresh Token not found", redirect: true})
    }

    try {
        const refreshTokenData = verifyJWTKey(refreshToken);

        if(!refreshTokenData){
            removeCookie(res, "refreshToken")
            return res.status(401).json({error: "Invalid Refresh Token", redirect: true})
        }
    
        model = refreshTokenData.role.toUpperCase() === "CAPTAIN" ? captainModel: userModel;
        user = await model.findOne({ _id: refreshTokenData._id, refreshToken })

        if(!user){
            removeCookie(res, "refreshToken")
            return res.status(401).json({error: "Invalid User ID", redirect: true})
        }

        req.userId = user._id;
        req.role = refreshTokenData.role;

        const newAccessToken = makeJWTKey(user._id, refreshTokenData.role, 180)
        const newRefreshToken = makeJWTKey(user._id, refreshTokenData.role, 360)

        setCookie(res, "accessToken", newAccessToken, 180000)
        setCookie(res, "refreshToken", newRefreshToken, 360000)

        user.refreshToken = newRefreshToken;
        await user.save()

        cache.set(`user:${user._id.toString()}`, user.toObject() )

        return next();

    } catch (error) {
        console.log(error)
        removeCookie(res, "refreshToken")
        return res.status(500).json({error: error.message, redirect: true})
    }
}

const authorizeUserContainer = (allowed = ["CAPTAIN", "USER"]) =>{
    return (req, res, next) =>{

        if(!req.userId || !allowed.includes(req.role)){
            return res.status(401).json({ error: "Unauthorized Access" })
        }

        return next();
    }
}

const loginSignupCheck = (req, res, next) =>{
   const { accessToken, refreshToken } = req.cookies;
   if(accessToken || refreshToken){
       return res.status(200).json({ redirect: true })
    }
    return next()
}

const socketAuthMiddleware = async (socket, next) =>{
    const socketCookie = cookie.parse(socket.handshake.headers.cookie || "")
    const accessToken = socketCookie?.accessToken;
    
    let data, user, model
    
    try {
        if(accessToken){
            data = verifyJWTKey(accessToken);

            if(data){
                model = data.role.toUpperCase() === "CAPTAIN" ? captainModel: userModel;
                user = await model.findById(data._id)
                if(!user){
                    return next(new Error("Invalid User Id in Access Token"))
                } 
            }
        }
        
        if(!user){
            const refreshToken = socketCookie?.refreshToken
            
            if(!refreshToken){
                return next(new Error("Refresh Token not found"))
            }
            
            data = verifyJWTKey(refreshToken)
            
            if(!data){
                return next(new Error("Invalid Refresh Token"))
            } 
            model = data.role.toUpperCase() === "CAPTAIN" ? captainModel: userModel;
            user = await model.findOne({_id: data._id, refreshToken})
            
            if(!user){
                return next(new Error("Invalid User Id in Refresh Token"))
            }
        }
        
        if(user.status === "offline"){
            user.status = "online"
            await user.save()
        }
        
        user = user.toObject()
        cache.set(`user:${user._id.toString()}`, user )
        
        socket.userId = user._id;
        socket.role = data.role;
        user.role = data.role;
        
        userIdToSocketId.set(user._id.toString(), socket.id)

        if(user.status === "on-ride"){
            const rideId = user.rides.at(-1);
            let ride, chat, rideWithoutChat;
            
            if(cache.has(`ride:${rideId}`)){
                rideWithoutChat = cache.get(`ride:${rideId.toString()}`)
                chat = await chatModel.findOne({ ride: rideId }).populate("message").lean()
                
            } else {
                ride = await rideModel.findById(rideId).populate({
                    path: "chat",
                    populate: {
                        path: "message"
                    }
                }).lean()
                
                if(!ride){
                    return next(new Error("Invalid Ride Id"))
                }
                
                ({ chat, ...rideWithoutChat } = ride);
                
                cache.set(`ride:${ride._id.toString()}`, rideWithoutChat)
            }
            
            socket.rideId = rideWithoutChat._id
            socket.join(socket.rideId.toString())
            
            let anotherPerson, anotherPersonRole, anotherPersonModel, anotherPersonId;
            
            if(user.role.toUpperCase() === "CAPTAIN"){
                anotherPersonModel = userModel
                anotherPersonId = ride.user;
                anotherPersonRole = "USER"
                
            } else {
                anotherPersonModel = captainModel
                anotherPersonId = ride.captain;
                anotherPersonRole = "CAPTAIN"
            }
            
            if(cache.has(`user:${anotherPersonId}`)){
                anotherPerson = cache.get(`user:${anotherPersonId.toString()}`)
            }
            else{
                anotherPerson = await anotherPersonModel.findById(anotherPersonId).lean()
            } 
            
            if(!anotherPerson){
                return next(new Error(`Ride's ${anotherPersonRole} not found`))
            }
            
            anotherPerson.role = anotherPersonRole;
            socket.anotherPersonId = anotherPersonId;
            
            socket.emit("initial-data", { user, ride: rideWithoutChat, chat, anotherPerson })            
            return next()
        }
        
        socket.emit("initial-data", { user })
        return next();
        
    } catch (error) {
        console.log(error)
        return next(new Error(`Server Error: ${error.message}`))

    }
}

module.exports = {
    authorizeUserContainer,
    authenticateUser,
    loginSignupCheck,
    socketAuthMiddleware,
    userIdToSocketId
}

// offline
// online
// finding-driver
// on-ride

// userIdToSocketId