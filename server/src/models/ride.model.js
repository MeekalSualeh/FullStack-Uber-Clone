const mongoose = require("mongoose")

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain"
    },
    pickup:{
        name:{
            type:String,
            required: true
        },
        type:{
            type: String,
            enum:["Point"],
            default: "Point"
        },
        coordinates:{
            type: [ Number ],
            required: true
        },
        mainText:{
            type: String,
            required: true
        },
        secondaryText:{
            type: String,
        }
    },
    destination:{
        name:{
            type:String,
            required: true
        },
        type:{
            type: String,
            enum:["Point"],
            default: "Point"
        },
        coordinates:{ // lng, lat
            type: [ Number ],
            required: true
        },
        mainText:{
            type: String,
            required: true
        },
        secondaryText:{
            type: String,
        }
    },
    vehicle:{
        type: {
            type: String,
            enum:["auto", "moto", "car"],
            required: true
        },
        color: {
            type: String,
            minlength: [3, "Color must be atleast 3 characters longs"]
        },
        plate: {
            type: String,
            minlength: [5, "Plate number must be atleast 5 characters longs"]
        },
        capacity: {
            type: Number,
            min: [1, "Capacity must be atleast 1"]
        }
    },
    expectedDistance:{
        type: Number,
        required: true
    },
    expectedTime:{
        type: Number,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:["waiting", "accepted", "on-the-way", "completed", "cancelled-by-user", "cancelled-by-captain", "no-drivers-nearby", "ride-timeout"],
        default: "waiting"
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat"
    },
})

// paymentId:{

// },
// orderId:{

// },
// signature:{

// }

module.exports = mongoose.model("ride", rideSchema)