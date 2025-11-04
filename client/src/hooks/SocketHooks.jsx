import { useEffect } from "react"
import { useUserContext } from "../contexts/UserContextProvider"
import { useCaptainContext } from "../contexts/CaptainContextProvider"
import { useChatContext } from "../contexts/ChatContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { useSocketContext } from "../contexts/SocketContextProvider"
import { useAuthContext } from "../contexts/AuthContextProvider"

// FRONTEND EMIT EVENTS -------------- 12
// connection   
// disconnect       - All

// update-location          - Captain
// accept-ride              - Captain
// remove-ride              - Captain
// cancelled-by-captain     - Captain
// ride-started             - Captain
// ride-completed           - Captain

// cancelled-by-user        - User

// join-chatroom            - All
// give-chats               - All
// message-from-frontend    - All



// FRONTEND ON EVENTS -------------- 

// new-ride                 - Captain

// ride-timeout             - User

// initial-data             - All --Done
// update-location          - All
// remove-ride              - All
// ride-accepted            - All
// cancelled-by-captain     - All
// ride-started             - All
// ride-completed           - All
// cancelled-by-user        - All

// error                    - All --Done
// chats                    - All --Done
// message-from-backend     - All --Done


const useUserSocket = () => {
    const {socket} = useSocketContext()
    const {} = useUserContext()
    const {} = useCaptainContext()
    const {} = useChatContext()
    const { setRideData, setCancelledBy, setIsCancellingRide } = useRideContext()

    useEffect(() =>{
        if(!socket?.current) return

        const rideTimeoutHandler = ({ rideId }) =>{
            setRideData(null)
            setCancelledBy("timedOut")
        }
        
        const removeRideHandler = ({ rideId }) =>{
            setRideData(null)
            setCancelledBy("cancelledFindingDriver")
            setIsCancellingRide(false)
        }
        
        const cancelledByUserHandler = ({ rideId }) =>{
            setRideData(null)
            setCancelledBy("cancelledByUser")
            setIsCancellingRide(false)
        }

        socket.current?.on("cancelled-by-user", cancelledByUserHandler)
        socket.current?.on("remove-ride", removeRideHandler)
        socket.current?.on("ride-timeout", rideTimeoutHandler)
        
        return () =>{
            socket.current.off("cancelled-by-user", cancelledByUserHandler)
            socket.current.off("remove-ride", removeRideHandler)
            socket.current.off("ride-timeout", rideTimeoutHandler)
        }

    }, [socket.current])
    
}

const useCaptainSocket = () => {
  
    
}

const useCommonSocket = () => {
  
    const {socket} = useSocketContext()
    const {} = useUserContext()
    const { setCaptainLocation } = useCaptainContext()
    const {} = useChatContext()
    const {} = useRideContext()
    const { role } = useAuthContext()

    useEffect(() =>{
        if(!socket?.current) return

        const updateLocationHandler = ({ coordinates }) =>{
            setCaptainLocation(coordinates)
        }

        socket.current?.on("update-location", updateLocationHandler)

        return () =>{
            socket.current.off("update-location", updateLocationHandler)
        }

    }, [socket.current])
}

const useChatSocket = () => {
  
    const {socket} = useSocketContext()
    const { setChatData } = useChatContext()

    useEffect(() =>{
        if(!socket?.current) return

        const chatsHandler = ({chats}) =>{
            setChatData(chats)
        }

        const messageHandler = ({message}) =>{
            setChatData(prev => [...prev, message])
        }

        socket.current?.on("chats", chatsHandler)
        socket.current?.on("message-from-backend", messageHandler)

        return () =>{
            socket.current.off("chats", chatsHandler)
            socket.current.off("message-from-backend", messageHandler)
        }

    }, [socket.current])
    
}

const useErrorSocket = () => {
  
    const {socket} = useSocketContext()

    useEffect(() =>{
        if(!socket?.current) return

        const errorHandler = ({error}) =>{
            console.log(error)
        }

        socket.current?.on("error", errorHandler)

        return () =>{
            socket.current.off("error", errorHandler)
        }

    }, [socket.current])
}


export {
    useUserSocket,
    useCaptainSocket,
    useCommonSocket,
    useChatSocket,
    useErrorSocket
}