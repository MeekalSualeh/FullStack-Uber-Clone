import { useState } from "react"
import PanelButton from "./PanelButton"
import { RiUser3Fill, RiMapPin2Fill, RiInformation2Fill } from "@remixicon/react"
import { useSocketContext } from "../contexts/SocketContextProvider"

const RideRequestComponent = ({
    rideId,
    userName,
    pickup,
    destination,
    distance,
    time,
    fare,
    isAcceptingRide,
    setIsAcceptingRide
}) => {
    
    const [isAcceptingThisRide, setIsAcceptingThisRide] = useState(false)
    
    const { socket } = useSocketContext()

    const removeRideRequestHandler = (rideId) => {

        return () => socket.current?.emit("remove-ride", { rideId })
    }

    const onAcceptingRide = () =>{
        setIsAcceptingThisRide(true);
        setIsAcceptingRide(true)
        socket.current?.emit("accept-ride", { rideId })
    }

  return (
    <div className="w-full px-4 py-4 flex flex-col bg-gray-300 border-1 border-slate-400 rounded-xl box-border font-[helvetica] gap-y-2 font-semibold">

        <div className="flex gap-x-4">

            <RiUser3Fill size={25}/>

            <h2 className="text-black text-xl tracking-tight"
            >{userName}</h2>
        </div>

        <div className="flex gap-x-4">
            <RiMapPin2Fill size={24}/>

            <h3 className="text-lg text-slate-800"
            >{pickup}</h3>
        </div>

        <div className="flex gap-x-4">
            <RiMapPin2Fill size={24}/>            
            
            <h3 className="text-lg text-slate-800"
            >{destination}</h3>
        </div>


        <div className="flex gap-x-4">

            <RiInformation2Fill size={24}/>

            <div className="flex gap-x-5 flex-wrap gap-y-1 w-[279px] text-slate-700">

                <h4 className=""
                >Fare: {fare} PKR</h4>

                <h4 className=""
                >Time: {Math.ceil(time/60)} Mins</h4>

                <h4 className=""
                >Distance: {Math.ceil(distance/1000)} KMs</h4>

            </div>

        </div>

        <div
        className='flex items-center gap-x-5 mt-3'>

        <PanelButton 
        buttonName={isAcceptingThisRide? "Accepting ..." : "Accept"}
        disabled={isAcceptingRide}
        color="bg-green-600"
        onClick={onAcceptingRide}
        />

        <PanelButton 
        buttonName="Decline"
        disabled={isAcceptingRide}
        color="bg-red-600"
        onClick={removeRideRequestHandler(rideId)} 
        />
        
        </div>

    </div>
  )
}

export default RideRequestComponent
