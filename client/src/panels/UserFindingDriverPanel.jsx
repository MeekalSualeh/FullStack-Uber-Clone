import { useCallback, useEffect, useState } from "react"
import PanelButton from "../components/PanelButton"
import AnimatedTitlePing from "../components/AnimatedTitlePing"
import AnimatedVehicle from "../components/AnimatedVehicle"
import carImg from "/car.png"
import motoImg from "/moto.webp"
import autoImg from "/auto.webp"
import SingleInfo from "../components/SingleInfo"
import { RiMapPin2Fill, RiWalletFill } from "@remixicon/react"
import { useUserContext } from "../contexts/UserContextProvider"
import { useCaptainContext } from "../contexts/CaptainContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { useChatContext } from "../contexts/ChatContextProvider"


const UserFindingDriverPanel = ({
    onCancelTheRide, 
    vehicleType, 
    mainAndSecondaryText,
    fare,
    time,
    distance
}) => {

  const [isLoading, setIsLoading] = useState(false)

  const userData = useUserContext()
  const captainData = useCaptainContext()
  const rideData = useRideContext()
  const chatData = useChatContext()

  const tempSubmitHandler = () =>{ //delete this and all Contexts and put onCancelTheRide in button
    console.log(userData)
    console.log(captainData)
    console.log(rideData)
    console.log(chatData)

    onCancelTheRide()
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

            {isLoading && <div className="text-xl font-semibold text-slate-800 mt-10"> Creating Ride...</div>}

            {!isLoading && (
                <div className="mt-5 flex flex-col gap-y-4">

                    <SingleInfo
                    title={mainAndSecondaryText.pickup.mainText}
                    content={mainAndSecondaryText.pickup.secondaryText}
                    IconComponent={RiMapPin2Fill}
                    />

                    <SingleInfo
                    title={mainAndSecondaryText.destination.mainText}
                    content={mainAndSecondaryText.destination.secondaryText}
                    IconComponent={RiMapPin2Fill}
                    />

                    <SingleInfo
                    title={`PKR ${450}`}
                    content={`Time To Reach: ${Math.ceil(time/60)} mins, Distance: ${Math.ceil(distance/1000)} Kms`}
                    IconComponent={RiWalletFill}
                    />
                </div>
            )}
        </div>

        <div
        className='absolute bottom-10 w-screen flex justify-center'>
          <PanelButton
          disabled={isLoading}
          buttonName={isLoading ? "Creating Ride . . .": "Cancel Finding Ride"}
          onClick={tempSubmitHandler} 
          />
        </div>
    
    </>
  )
}

export default UserFindingDriverPanel