import { useSocketContext } from "../contexts/SocketContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { useEffect } from "react"

const LocationHook = () => {

    const { socket } = useSocketContext()
    const { rideData } = useRideContext()

    useEffect(() =>{

        if(!socket?.current) return; 

        const rideId = (rideData?.status === "accepted" || rideData?.status === "on-the-way") ? rideData._id : null;

        if(window.navigator.geolocation){

            const successHandler = ({coords}) =>{
                socket?.current.emit("update-location", {coordinates: [coords.longitude, coords.latitude], rideId} )
            }

            const errorHandler = (error) =>{
                console.log(error)
            }

            const options = {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 10000
            }
            
            const watchId = window.navigator.geolocation.watchPosition(successHandler, errorHandler, options)

            return () =>{
                window.navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [socket?.current, rideData?.status])

}

export {
    LocationHook
} 