import { useCallback, useEffect, useState } from "react"
import PanelButton from "../components/PanelButton"
import AnimatedTitlePing from "../components/AnimatedTitlePing"
import AnimatedVehicle from "../components/AnimatedVehicle"
import carImg from "/car.png"
import motoImg from "/moto.webp"
import autoImg from "/auto.webp"
import SingleInfo from "../components/SingleInfo"
import { RiMapPin2Fill, RiWalletFill, RiErrorWarningFill, RiHourglassFill } from "@remixicon/react"
import { useUserContext } from "../contexts/UserContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { createRide } from "../api/ride.api"
import { useSocketContext } from "../contexts/SocketContextProvider"

const UserFindingDriverPanel = ({
    onGoBack, 
    vehicleType, 
    mainAndSecondaryText,
    fare,
    time,
    distance,
    pickupCoordinates,
    destinationCoordinates
}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { userData } = useUserContext()
  const {socket} = useSocketContext()
  const { 
    rideData, 
    setRideData, 
    cancelledBy,
    setCancelledBy,
    isCancellingRide, 
    setIsCancellingRide
  } = useRideContext()

  let cancelReason = "";
  
  if(cancelledBy === "timedOut") cancelReason = "Ride timed-out, No nearby driver accepted the ride"
  else if(cancelledBy === "cancelledFindingDriver") cancelReason = "Finding nearby driver is cancelled by You"

  useEffect(() =>{

    const fetchData = async () =>{

      try {
        const response = await createRide({ 
          pickupCoordinates, 
          destinationCoordinates, 
          expectedDistance: distance, 
          expectedTime: time,
          fare,
          type: vehicleType,
        })
        
        if(!response.success){
          setError(response.reason)
          return ;
        }

        setRideData(response.ride)

      } catch (error) {
          console.log(error)
          setError(error)

      } finally {
        setIsLoading(false)
      }
    }

      fetchData()

  },[])

  const onGoBackHandler = () =>{ //change name and delete console.log
    
    setCancelledBy("")

    onGoBack()
  }

  const onCancelFindingDriver = () =>{
    // if(!socket?.current) return;

    setIsCancellingRide(true)
    socket.current?.emit("cancelled-by-user", {rideId: rideData._id})
  }
  

  return (
    <>
        <div className="flex flex-col w-[85%] mt-5 mx-auto items-center">

            <AnimatedVehicle 
            imgSrc={vehicleType === "car" ? carImg : vehicleType === "moto" ? motoImg : autoImg}
            mtClass="mt-7 mb-4"
            imgCover={vehicleType === "car"}
            />

            <AnimatedTitlePing 
            steadyColor={isLoading ? "bg-orange-400" : "bg-green-400"}
            blinkingColor={isLoading ? "bg-orange-400" : "bg-green-400"}
            title="Looking For Nearby Drivers..."/>

            {isLoading && <div className="text-xl font-semibold text-slate-800 mt-10">Creating Ride...</div>}

            {cancelReason && 
            <SingleInfo
              title={cancelledBy === "timedOut" ? "Finding Ride TimeOut" : "Cancelld By You"}
              content={cancelReason}
              IconComponent={RiHourglassFill}
              extraParentContainerClass="ring-1 ring-slate-400 mt-5"
              contentExtraClasses="text-slate-600 text-md"
              contentBigger={true}
                    />}

            {error && 
            <SingleInfo
              title="ERROR"
              content={error}
              IconComponent={RiErrorWarningFill}
              extraParentContainerClass="ring-1 ring-slate-400 mt-8"
              contentExtraClasses="text-slate-600"
              contentBigger={true}
                    />}

            {(!isLoading && !error && !cancelReason) && (
                <div className="mt-5 flex flex-col gap-y-4">

                    <SingleInfo
                    title={mainAndSecondaryText.pickup.mainText}
                    content={mainAndSecondaryText.pickup.secondaryText}
                    IconComponent={RiMapPin2Fill}
                    extraParentContainerClass="ring-1 ring-slate-400"
                    />

                    <SingleInfo
                    title={mainAndSecondaryText.destination.mainText}
                    content={mainAndSecondaryText.destination.secondaryText}
                    IconComponent={RiMapPin2Fill}
                    extraParentContainerClass="ring-1 ring-slate-400"
                    />

                    <SingleInfo
                    title={`PKR ${fare}`} //hardcoded price
                    content={`Time To Reach: ${Math.ceil(time/60)} mins, Distance: ${Math.ceil(distance/1000)} Kms`}
                    IconComponent={RiWalletFill}
                    extraParentContainerClass="ring-1 ring-slate-400"
                    />
                </div>
            )}
        </div>

        <div
        className='absolute bottom-10 w-screen flex justify-center'>
          <PanelButton
          disabled={isLoading || isCancellingRide}
          buttonName={isLoading ? "Creating Ride . . ." : ( error || cancelReason ) ? "Go Back": isCancellingRide ? "Cancelling Ride . . ." : "Cancel Finding Driver"}
          onClick={(error || cancelReason) ? onGoBackHandler : onCancelFindingDriver } 
          />
        </div>
        
    </>
  )
}

export default UserFindingDriverPanel