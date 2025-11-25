import { io } from "socket.io-client"

let socket = null;

const connectSocket = () =>{
    if(!socket){
        socket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
            transports: ["websocket"]
        })

    }

    return socket
}

const getSocket = () => socket

const disconnectSocket = () =>{
    if(socket){
        socket.disconnect()
        socket = null;
        console.log("socket disconnected")
    }
}

export {
    connectSocket,
    getSocket,
    disconnectSocket
}