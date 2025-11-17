import { useEffect } from "react"
import { useUserContext } from "../contexts/UserContextProvider"
import { useCaptainContext } from "../contexts/CaptainContextProvider"
import { useChatContext } from "../contexts/ChatContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { useSocketContext } from "../contexts/SocketContextProvider"
import { useAuthContext } from "../contexts/AuthContextProvider"
import { flushSync } from "react-dom"

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
// ride-started             - All
// ride-completed           - All
// cancelled-by-captain     - All
// cancelled-by-user        - All

// error                    - All --Done
// chats                    - All --Done
// message-from-backend     - All --Done


const useUserSocket = (
    rideCancelledByUserSocketHandler, 
    rideCancelledByCaptainSocketHandler,
    rideAcceptedSocketHandler,
    rideStartedSocketHandler,
    rideCompletedSocketHandler
) => {

    const {socket} = useSocketContext()
    const {setUserData} = useUserContext()
    const {setCaptainData} = useCaptainContext()
    const { setChatData } = useChatContext()
    const { setRideData, setCancelledBy, isCancellingRide, setIsCancellingRide } = useRideContext()

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
        
        const findingDriverCancelledHandler = ({ rideId }) =>{
            setRideData(null)
            setCancelledBy("cancelledFindingDriver")
            setIsCancellingRide(false)
        }

        const cancelledByUserHandler = ({ rideId }) =>{

            flushSync(() =>{
                setCancelledBy("cancelledByUser")
                rideCancelledByUserSocketHandler()
            })
            
            setIsCancellingRide(false)
            setChatData({ message:[] })
            setRideData({})
        }

        const cancelledByCaptainHandler = ({ rideId }) =>{

            flushSync(() =>{
                setCancelledBy("cancelledByCaptain")
                rideCancelledByCaptainSocketHandler()
            })
            
            setIsCancellingRide(false)
            setChatData({ message:[] })
            setRideData({})
        }

        const rideAcceptedHandler = ({ ride, user, captain }) =>{

            setRideData(ride)
            setUserData(user)
            setCaptainData(captain)
            rideAcceptedSocketHandler()
        }
        
        const rideStartedHandler = ({ rideId }) =>{

            setRideData(prev => ({...prev, status:"on-the-way"}))
            rideStartedSocketHandler()
        }
        
        const rideCompletedHandler = ({ rideId }) =>{
            rideCompletedSocketHandler()
        }


        socket.current?.on("ride-timeout", rideTimeoutHandler)
        socket.current?.on("finding-driver-cancelled", findingDriverCancelledHandler)
        socket.current?.on("cancelled-by-user", cancelledByUserHandler)
        socket.current?.on("cancelled-by-captain", cancelledByCaptainHandler)
        socket.current?.on("remove-ride", removeRideHandler)
        socket.current?.on("ride-accepted", rideAcceptedHandler)
        socket.current?.on("ride-started", rideStartedHandler)
        socket.current?.on("ride-completed", rideCompletedHandler)
        
        return () =>{
            socket.current.off("ride-timeout", rideTimeoutHandler)
            socket.current.off("finding-driver-cancelled", findingDriverCancelledHandler)
            socket.current.off("cancelled-by-user", cancelledByUserHandler)
            socket.current.off("cancelled-by-captain", cancelledByCaptainHandler)
            socket.current.off("remove-ride", removeRideHandler)
            socket.current.off("ride-accepted", rideAcceptedHandler)
            socket.current.off("ride-started", rideStartedHandler)
            socket.current.off("ride-completed", rideCompletedHandler)
        }

    }, [socket.current])
    
}

const useCaptainSocket = (
    setRideRequests,
    rideCancelledByUserSocketHandler, 
    rideCancelledByCaptainSocketHandler,
    rideAcceptedSocketHandler,
    rideStartedSocketHandler,
    rideCompletedSocketHandler
) => {
  
    const {socket} = useSocketContext()
    const {setUserData} = useUserContext()
    const {setCaptainData} = useCaptainContext()
    const { setChatData } = useChatContext()
    const { setRideData, setCancelledBy, isCancellingRide, setIsCancellingRide } = useRideContext()

    useEffect(() =>{
        if(!socket?.current) return

        const newRideHandler = ({ ride, user }) =>{

            const {
                _id,
                pickup, 
                destination, 
                expectedDistance, 
                expectedTime, 
                fare
            } = ride

            setRideRequests((prev) => {
                return [...prev, {
                    _id: _id.toString(),
                    userName: `${user.firstname}  ${user.lastname}`,
                    pickup: pickup.name,
                    destination: destination.name,
                    distance: expectedDistance,
                    time: expectedTime,
                    fare
                }]
            })
        }

        const removeRideHandler = ({ rideId }) =>{
            
            setRideRequests((rides) =>{
                const index = rides.findIndex(ride => rideId.toString() === ride._id)

                if(index === -1) return rides;

                const tempRides = [...rides];
                tempRides.splice(index, 1);

                return tempRides;
            })
        }
        
        const cancelledByUserHandler = ({ rideId }) =>{

            flushSync(() =>{
                setCancelledBy("cancelledByUser")
                rideCancelledByUserSocketHandler()
            })

            setIsCancellingRide(false)
            setChatData({ message:[] })
            setRideData({})
        }

        const cancelledByCaptainHandler = ({ rideId }) =>{
            
            flushSync(() =>{
                setCancelledBy("cancelledByCaptain")
                rideCancelledByCaptainSocketHandler()
            })

            setIsCancellingRide(false)
            setChatData({ message:[] })
            setRideData({})
        }

        const rideAcceptedHandler = ({ ride, user, captain }) =>{

            setRideData(ride)
            setUserData(user)
            setCaptainData(captain)
            rideAcceptedSocketHandler()
        }
        
        const rideStartedHandler = ({ rideId }) =>{

            setRideData(prev => ({...prev, status:"on-the-way"}))
            rideStartedSocketHandler()
        }
        
        const rideCompletedHandler = ({ rideId }) =>{
            rideCompletedSocketHandler()
        }


        socket.current?.on("new-ride", newRideHandler)
        socket.current?.on("cancelled-by-user", cancelledByUserHandler)
        socket.current?.on("cancelled-by-captain", cancelledByCaptainHandler)
        socket.current?.on("remove-ride", removeRideHandler)
        socket.current?.on("ride-accepted", rideAcceptedHandler)
        socket.current?.on("ride-started", rideStartedHandler)
        socket.current?.on("ride-completed", rideCompletedHandler)
        
        return () =>{
            socket.current.off("new-ride", newRideHandler)
            socket.current.off("cancelled-by-user", cancelledByUserHandler)
            socket.current.off("cancelled-by-captain", cancelledByCaptainHandler)
            socket.current.off("remove-ride", removeRideHandler)
            socket.current.off("ride-accepted", rideAcceptedHandler)
            socket.current.off("ride-started", rideStartedHandler)
            socket.current.off("ride-completed", rideCompletedHandler)
        }

    }, [socket.current])
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
            console.log("all chats: ", chats)
        }

        const messageHandler = ({message}) =>{
            setChatData(prev => ({...prev, messages:[...(prev?.messages || []), message]} ) )
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