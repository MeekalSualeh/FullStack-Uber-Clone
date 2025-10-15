const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
        enum:["offline", "online", "on-ride", "finding-driver"],
        default: "offline"
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

module.exports = mongoose.model("user", userSchema)