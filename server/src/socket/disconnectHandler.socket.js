const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const rideModel = require("../models/ride.model");
const cache = require("../services/cache.services")
const { userIdToSocketId } = require("../middlewares/authenticationAndAuthorization.middleware");

module.exports = (io, socket) =>{
    socket.removeAllListeners("disconnect")

    socket.on("disconnect", async () =>{
        console.log(`${socket.id} disconnected`)
        let ride;

        try {
            const model = socket.role.toUpperCase() === "CAPTAIN" ? captainModel: userModel;
            const user = await model.findById(socket.userId)

            if(user.status === "finding-driver"){
                let rideId = user.rides.at(-1)
                delete socket.rideId

                ride = await rideModel.findByIdAndUpdate(rideId, {status: "cancelled-by-user"})

                if(!ride){
                    return;
                }
                rideId = rideId.toString()

                socket.to(rideId).emit("remove-ride", rideId)
                io.socketsLeave(rideId);

                const rideTimeout = cache.get(`rideTimeout:${rideId}`)
                if(rideTimeout){
                    clearTimeout(rideTimeout)
                    cache.del(`rideTimeout:${rideId}`)
                }
                user.status = "offline"
                await user.save()
            }
            
            if(user.status === "online"){
                user.status = "offline"
                await user.save()
            }
            
        } catch (error) {
            console.log(error)
        }

        userIdToSocketId.delete(socket.userId.toString())
        cache.del(`user:${socket.userId.toString()}`)
    })
}