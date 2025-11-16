const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const rideModel = require("../models/ride.model");
const cache = require("../services/cache.services")

module.exports = (io, socket) =>{
    socket.removeAllListeners("cancelled-by-user")
        
    socket.on("cancelled-by-user", async ({rideId}) =>{
        try {

            const ride = await rideModel.findByIdAndUpdate(rideId, { status: "cancelled-by-user" }, { new: true})

            if(!ride){
                return socket.emit("error", {error: "couldn't cancel ride, ride not found"})
            }
            
            const user = await userModel.findById(socket.userId)
            
            if(!user){
                return socket.emit("error", {error: "couldn't cancel ride, user not found"})
            }

            const userStatus = user.status;
            user.status = "online"
            await user.save()

            const room = rideId.toString()

            if(userStatus === "finding-driver"){

                const rideTimeout = cache.get(`rideTimeout:${room}`)
                if(rideTimeout){
                    clearTimeout(rideTimeout)
                    cache.del(`rideTimeout:${room}`)
                }
                
                io.to(room).emit("remove-ride", {rideId: room})
                socket.emit("finding-driver-cancelled", {rideId: room})
            }

            else {
                const captain = await captainModel.findByIdAndUpdate(ride.captain, { status: "online" }, { new: true })
                
                if(!captain){
                    return socket.emit("error", {error: "couldn't cancel ride, captain not found"})
                }

                io.to(room).emit("cancelled-by-user", {rideId: room})

                cache.del(`ride:${rideId.toString()}`);
                cache.set(`user:${captain._id.toString()}`, captain.toObject());
            }
            
            io.socketsLeave(room)
            delete socket.rideId

            cache.set(`user:${user._id.toString()}`, user.toObject());


        } catch (error) {
            console.log(error)
            return socket.emit("error", {error: error.message})
        }
    })
}