const captainModel = require("../models/captain.model")
const { userIdToSocketId } = require("../middlewares/authenticationAndAuthorization.middleware")

module.exports.getNearbyCaptains = async (pickupCoordinates, vehicleType) =>{
    try {
        const captainsId = await captainModel.find({
            location:{
                $near:{
                    $geometry:{
                        type: "Point",
                        coordinates: pickupCoordinates //lng, lat
                    },
                    $maxDistance: 3000
                }
            },
            status: "online",
            "vehicle.type": vehicleType
        }).select("_id")

        if(captainsId.length === 0){
            return { error: "No captains nearby" }
        }
        
        let captainsSocketId = captainsId
        .map(({ _id }) => userIdToSocketId.get(_id.toString()))
        .filter(Boolean)

        if(captainsSocketId.length === 0){
            return { error: "No captains nearby" }
        }

        return captainsSocketId;
        
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}

// ctrl + i --> copilot