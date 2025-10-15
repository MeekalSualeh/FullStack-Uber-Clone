const chatModel = require("../models/chat.model")
const messageModel = require("../models/message.model");

module.exports = (io, socket) =>{
    socket.removeAllListeners("join-chatroom")
    socket.removeAllListeners("give-chats")
    socket.removeAllListeners("message-from-frontend")

    socket.on("join-chatroom", async (rideId) =>{

        const chat = await chatModel.findOne({ ride: rideId })

        if(!chat){
            return socket.emit("error", "Unauthorized Chat Room ID")
        }
        
        socket.join(rideId.toString())
        return socket.emit("chats", chat)
    })

    socket.on("give-chats", async (rideId) =>{

        const chat = await chatModel.findOne({ ride: rideId }) 

        if(!chat){
            return new Error("Unauthorized Chat Room ID")
        }
        
        return socket.emit("chats", chat)
    })


    socket.on("message-from-frontend", async ({ content, rideId }) =>{
        try {
            const chat = await chatModel.findOne({ ride: rideId })

            if(!chat){
                return socket.emit("error", "Unauthorized Chat Room ID")
            }

            const message = await messageModel.create({
                rideId,
                author: socket.userId,
                authorModel: socket.role.toLowerCase(),
                content
            })
    
            if(!message){
                return socket.emit("error", "Couldn't send message")
            }

            chat.messages.push(message._id)
            await chat.save()

            return io.to(rideId.toString()).emit("message-from-backend", message)

        } catch (error) {
            console.log(error)
            socket.emit("error", error.message)
        }
    })
}