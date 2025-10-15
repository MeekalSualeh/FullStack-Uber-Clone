const mongoose = require("mongoose")

const captainSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minlength: [3, "First name must be atleast 3 characters long"]
    },
    lastname:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Enter valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be atleast 8 characters long"],
        select: false
    },
    status:{
        type:String,
        enum:["offline", "online", "on-ride"],
        default: "offline"
    },
    location:{
        type:{
            type: String,
            enum:["Point"],
            default: "Point"
        },
        coordinates:{
            type: [Number],  // [lng, lat]
            default: [0, 0]
        }
    },
    vehicle:{
        type: {
            type: String,
            required: true,
            enum:["auto", "moto", "car"]
        },
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be atleast 3 characters longs"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [5, "Plate number must be atleast 5 characters longs"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be atleast 1"]
        }
    },
    totalEarning: {
        type: Number,
        default: 0
    },
    totalEarningToday: {
        type: Number,
        default: 0
    },
    totalRidesToday:{
        type:Number,
        default:0
    },
    rides:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ride"
        }
    ],
    refreshToken: {
        type: String,
        select: false
    }
}, {timestamps: true})

captainSchema.index({ location: "2dsphere" })

module.exports = mongoose.model("captain", captainSchema)