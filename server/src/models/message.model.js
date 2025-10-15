const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    rideId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ride",
        required: true,
        select: false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "authorModel",
    },
    authorModel:{
        type: String,
        enum:["user", "captain"],
        required: true,
        select: false
    },
    content:{
        type: String,
        required: true
    }
}, { timestamps: true })

// status: "sent" | "delivered" | "seen"

messageSchema.index({ createdAt: -1 })

module.exports = mongoose.model("message", messageSchema)