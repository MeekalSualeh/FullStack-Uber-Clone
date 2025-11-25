const { Server } = require("socket.io")
const userHandler = require("./userHandler.socket")
const captainHandler = require("./captainHandler.socket")
const chatHandler = require("./chatHandler.socket")
const disconnectHandler = require("./disconnectHandler.socket")
const { socketAuthMiddleware } = require("../middlewares/authenticationAndAuthorization.middleware")

let io;

const socketSetup = (server) =>{
    io = new Server(server, {
        cors: {
            origin: "https://full-stack-uber-clone-mu.vercel.app/",
            credentials: true
        }
    })   

    io.use(socketAuthMiddleware)

    io.on("connection", (socket) =>{
        console.log(`Socket: ${socket.id} connected`)
        
        if(socket.role.toUpperCase() === "CAPTAIN"){
            captainHandler(io, socket)
        }
    
        if(socket.role.toUpperCase() === "USER"){
            userHandler(io, socket)
        }
        
        chatHandler(io, socket)
    
        disconnectHandler(io, socket)
    
    })
}

const getIO = () =>{
    if(!io){
        new Error("IO not initialized")
    }
    return io
}

module.exports = {
    socketSetup,
    getIO
}