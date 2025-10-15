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
                    $maxDistance: 5000
                }
            },
            status: "online",
            "vehicle.type": vehicleType
        }).select("_id")

        if(captainsId.length === 0){
            return { error: "No captains nearby" }
        }

        let captainsSocketId = captainsId.map(({ _id }) => {
            return userIdToSocketId.get(_id.toString())
        });

        return captainsSocketId;
        
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}

// ctrl + i --> copilot