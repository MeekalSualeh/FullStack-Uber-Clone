const chatModel = require("../models/chat.model")
const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const rideModel = require("../models/ride.model");
const cache = require("../services/cache.services");
const { userIdToSocketId } = require("../middlewares/authenticationAndAuthorization.middleware");

module.exports = (io, socket) =>{
    socket.removeAllListeners("update-location")
    socket.removeAllListeners("accept-ride")
    socket.removeAllListeners("remove-ride")
    socket.removeAllListeners("cancelled-by-captain")
    socket.removeAllListeners("ride-started")
    socket.removeAllListeners("ride-completed")

    socket.on("update-location", async ({coordinates, rideId = null}) =>{
        try {
            await captainModel.findByIdAndUpdate(socket.userId, { "location.coordinates": coordinates })

            if(rideId){
                socket.to(socket.rideId.toString()).emit("update-location", {coordinates})
            }

        } catch (error) {
            console.log(error)
            return socket.emit("error", { error:error.message })
        }
    })
    
    socket.on("accept-ride", async ({rideId}) =>{
        try {
            const ride = await rideModel.findOneAndUpdate({ _id: rideId, status:"waiting" }, {captain: socket.userId, status: "accepted"}, {new : true})

            if(!ride){
                return socket.emit("error", {error: "Ride Request does not exist"})
            }

            const captain = await captainModel.findByIdAndUpdate(socket.userId, {$push: { rides: rideId }, status: "on-ride"}, { new: true })

            if(!captain){
                return socket.emit("error", {error: "couldn't accept ride, Captain not found "})
            }

            ride.vehicle = captain.vehicle
            await ride.save()
            
            await chatModel.findOneAndUpdate({ride: rideId}, {$push: { participants: { participant: socket.userId, participantModel: "captain"} }})

            const user = await userModel.findByIdAndUpdate(ride.user, { status: "on-ride" }, { new: true })

            if(!user){
                return socket.emit("error", {error: "couldn't accept ride, User not found "})
            }

            const room = rideId.toString()
            const userSocketId = userIdToSocketId.get(user._id.toString())

            const rideTimeout = cache.get(`rideTimeout:${room}`)
            if(rideTimeout){
                clearTimeout(rideTimeout)
                cache.del(`rideTimeout:${room}`)
            }

            cache.set(`ride:${room}`, ride.toObject())
            cache.set(`user:${captain._id.toString()}`, captain.toObject())
            cache.set(`user:${user._id.toString()}`, user.toObject())
            socket.rideId = room
            
            // baki captains se ride remove krna
            io.in(room).except(socket.id).emit("remove-ride", {rideId});
            io.in(room).except(socket.id).socketsLeave();
            io.sockets.sockets.get(userSocketId)?.join(room)
            
            // user and captain ko ride accept a event bhejna
            return socket.to(room).emit("ride-accepted", { ride, user, captain })

        } catch (error) {
            console.log(error)
            socket.emit("error", { error:error.message })
        }
    })
    
    socket.on("remove-ride", ({rideId}) =>{
        socket.leave(rideId.toString())
        socket.emit("remove-ride", {rideId})
    })
    
    socket.on("cancelled-by-captain", async ({rideId}) =>{
        try {

            const ride = await rideModel.findByIdAndUpdate(rideId, { status: "cancelled-by-captain" }, { new: true })

            if(!ride){
                return socket.emit("error", {error: "couldn't cancel ride, ride not found"})
            }
            
            const captain = await captainModel.findByIdAndUpdate(socket.userId, { status: "online" }, {new: true})
            
            if(!captain){
                return socket.emit("error", {error: "couldn't cancel ride, Captain not found "})
            }

            const user = await userModel.findByIdAndUpdate(ride.user, { status: "online" }, { new: true })

            if(!user){
                return socket.emit("error", {error: "couldn't cancel ride, User not found"})
            }

            const room = rideId.toString()
            delete socket.rideId

            io.to(room).emit("cancelled-by-captain", {rideId: room})
            io.socketsLeave(room)

            cache.del(`ride:${rideId.toString()}`)
            cache.set(`user:${user._id.toString()}`, user.toObject())
            cache.set(`user:${captain._id.toString()}`, captain.toObject())

        } catch (error) {
            console.log(error)
            return socket.emit("error", { error:error.message })
        }
    })

    socket.on("ride-started", async ({rideId}) =>{
        try {
            const ride = await rideModel.findByIdAndUpdate(rideId, { status: "on-the-way" }, { new: true })

            if(!ride){
                return socket.emit("error", {error: "Cannot start ride, ride not found"})
            }

            rideId = rideId.toString()
            cache.set(`ride:${rideId}`, ride.toObject())
            io.to(rideId.toString()).emit("ride-started", {rideId})

        } catch (error) {
            console.log(error)
            socket.emit("error", { error:error.message })
        }
    })

    socket.on("ride-completed", async ({rideId}) =>{
        try {
            const ride = await rideModel.findByIdAndUpdate(rideId, {status: "completed"}, { new: true})

            if(!ride){
                return socket.emit("error", {error: "Cannot complete ride, ride not found"})
            }

            const captain = await captainModel.findByIdAndUpdate(socket.userId, {status: "online"}, { new: true})

            if(!captain){
                return socket.emit("error", {error: "Cannot complete ride, captain not found"})
            }

            const user = await userModel.findByIdAndUpdate(ride.user, {status: "online"}, { new: true})

            if(!user){
                return socket.emit("error", {error: "Cannot complete ride, user not found"})
            }

            const room = rideId.toString();

            io.to(room).emit("ride-completed", {rideId: room})
            io.socketsLeave(room.toString())
            delete socket.rideId;

            cache.del(`ride:${rideId.toString()}`);
            cache.set(`user:${user._id.toString()}`, user.toObject());
            cache.set(`user:${captain._id.toString()}`, captain.toObject());

        } catch (error) {
            console.log(error)
            socket.emit("error", { error:error.message })
        }
    })
}

// agar ride.type h mere paas aur mujhey ride.color, capacity, plate daalna hun to captain ka vehicle object pora assign krdo ya sirf color, capacity and plate nikaal kr daalo ? 