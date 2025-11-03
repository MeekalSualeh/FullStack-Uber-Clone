const rideModel = require("../models/ride.model")
const userModel = require("../models/user.model")
const { rideSchema } = require("../services/validation.services")
const { getIO } = require("../socket/index.socket")
const { getNearbyCaptains } = require("../services/captain.services")
const cache = require("../services/cache.services")
const { userIdToSocketId } = require("../middlewares/authenticationAndAuthorization.middleware")

const handleCreatingRide = async (req, res) =>{
    const result = rideSchema.safeParse(req.body)

    if(result.error){
        return res.status(400).json({ error: result.error.issues[0].message })
    }

    const { pickupCoordinates, destinationCoordinates, expectedDistance, expectedTime, fare, type } = result.data

    try {
        let userId = req.userId;

        const existingRide = await rideModel.findOne({ user: userId, status: { $in: ["waiting", "accepted", "on-the-way"] } }).lean()

        if(existingRide){
            return res.status(400).json({ error: "User is already finding driver / on ride" })
        }

        const ride = await rideModel.create({
            user: userId,
            pickup:{
                coordinates: pickupCoordinates
            },
            destination:{
                coordinates: destinationCoordinates
            },
            expectedDistance,
            expectedTime,
            fare,
            vehicle:{
                type
            }
        })

        const user = await userModel.findByIdAndUpdate(userId, { $push: {rides: ride._id}, status: "finding-driver" }, { new: true })

        if(!user){
            return res.status(400).json({ error: "Invalid User ID" })
        }

        let nearbyCaptains = await getNearbyCaptains(pickupCoordinates, type)

        if(nearbyCaptains?.error){
            user.status = "online"
            ride.status = "no-drivers-nearby"
            await user.save()
            await ride.save()

            return res.status(200).json({ error: nearbyCaptains.error })
        }

        // getting IO instance
        const io = getIO()

        // making captains socket id join ride room
        const room = ride._id.toString()
        nearbyCaptains.forEach((socketId) =>{
            if(socketId){
                io.sockets.sockets.get(socketId)?.join(room)
            }
        })
        
        io.to(room).emit("new-ride", { ride, user })

        const rideTimeout = setTimeout(async () =>{
                try {
                    const timedOutRide = await rideModel.findOneAndUpdate({_id: ride._id, status: "waiting"}, { status: "ride-timeout" })
                    
                    if(timedOutRide.matchedCount === 0){
                        return;
                    }

                    const userSocketId = userIdToSocketId.get(userId.toString())

                    const user = await userModel.findByIdAndUpdate(userId, { status: "online" })
                    
                    if(user.matchedCount === 0){
                        return io.to(userSocketId).emit("error", {error: "No User found in Ride timeout"})
                    }

                    io.to(room).emit("remove-ride", {rideId: timedOutRide._id})
                    io.to(userSocketId).emit("ride-timeout", {rideId: timedOutRide._id})

                } catch (error) {
                    console.log(error)
                    return io.to(room).emit("error", {error: error.message})
                }
        }, 60000)

        cache.set(`rideTimeout:${ride._id.toString()}`, rideTimeout)

        return res.status(201).json({ success: true, ride })

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    handleCreatingRide,
}

// pehlesirf vehicle.type add krna phir jab captain accept krle phir vehicle ka pora object including type add krna

// cancel rideTimeout when:
// 1. user khud cancel krde
// 2. user DC hojaye
// 3. captain accept karle
// cache se bhi del krna h rideTimeout

// captain, user and ride k status check krlena

// timeout m session kese lagao and timeout and interval k baahir wala session inkay timeout and interval k andar bhi apply hosakta ?