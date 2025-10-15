const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    participants:[{
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "participantModel",
            required: true
        },
        participantModel:{
            type: String,
            enum:["user", "captain"],
            required: true
        }
    }],
    ride:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "ride",
        required: true,
        select: false
    },
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message"
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("chat", chatSchema)