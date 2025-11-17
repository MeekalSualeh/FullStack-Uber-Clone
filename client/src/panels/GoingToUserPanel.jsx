import { useEffect, useState } from "react"
import PanelButton from "../components/PanelButton"
import AnimatedVehicle from "../components/AnimatedVehicle"
import carImg from "/car.png"
import motoImg from "/moto.webp"
import autoImg from "/auto.webp"
import AnimatedTitlePing from "../components/AnimatedTitlePing"
import SingleInfo from "../components/SingleInfo"
import { RiErrorWarningFill, RiMapPin2Fill, RiWalletFill, RiTaxiFill, RiRidingFill } from "@remixicon/react"
import { useRideContext } from "../contexts/RideContextProvider"
import { useCaptainContext } from "../contexts/CaptainContextProvider"
import { useUserContext } from "../contexts/UserContextProvider"

const GoingToUserPanel = ({
  onGoBack,
  cancelRideHandler,
  chatHandler,
  rideStartedHandler
}) => {

  const [error, setError] = useState(false)

  const {rideData, isCancellingRide } = useRideContext()
  const {pickup, destination, vehicle, expectedDistance: distance, expectedTime: time, fare} = rideData || {}

  const { userData } = useUserContext()

  return (
    <>
      <div className="mt-12 items-center mx-8">

        {!error && 
        <>
        <div className="w-full flex flex-col items-center mb-8">
          <AnimatedVehicle
          imgSrc={vehicle?.type === "car" ? carImg : vehicle?.type === "moto" ? motoImg : autoImg}
          mtClass="mb-5"
          imgCover={vehicle?.type === "car"}
          />
  
          <AnimatedTitlePing
          steadyColor={(false) ? "bg-orange-400" : "bg-green-400"}
          blinkingColor={(false) ? "bg-orange-400" : "bg-green-400"}
          title="User is waiting for ya ..."/>
        </div>

        <div className="w-full mt-5 flex flex-col gap-y-4 h-[250px] overflow-y-auto no-scrollbar py-1 px-1">

          <SingleInfo
          title={`User: ${userData?.firstname} ${userData?.lastname || ""}`}
          IconComponent={RiRidingFill}
          extraParentContainerClass="ring-1 ring-slate-400"
          contentBigger={true}
          />

          <SingleInfo
          title="Vehicle"
          content={`Type: ${vehicle?.type} | Color: ${vehicle?.color} | Plate: ${vehicle?.plate}`}
          IconComponent={RiTaxiFill}
          extraParentContainerClass="ring-1 ring-slate-400"
          />

          <SingleInfo
          title={pickup?.mainText}
          content={pickup?.secondaryText}
          IconComponent={RiMapPin2Fill}
          extraParentContainerClass="ring-1 ring-slate-400"
          />

          <SingleInfo
          title={destination?.mainText}
          content={destination?.secondaryText}
          IconComponent={RiMapPin2Fill}
          extraParentContainerClass="ring-1 ring-slate-400"
          />

          <SingleInfo
          title={`PKR ${fare || 0}`} //hardcoded price
          content={`Time To Reach: ${Math.ceil(time/60) || 0} mins, Distance: ${Math.ceil(distance/1000) || 0} Kms`}
          IconComponent={RiWalletFill}
          extraParentContainerClass="ring-1 ring-slate-400"
          />
        </div>

        </>
        }

        {error && 
            <SingleInfo
              title="ERROR"
              content={error}
              IconComponent={RiErrorWarningFill}
              extraParentContainerClass="ring-1 ring-slate-400 mt-1"
              contentExtraClasses="text-slate-600"
              contentBigger={true}
                    />}

      </div>
      <div
      className='absolute bottom-4 w-screen flex flex-col items-center gap-y-4 px-3'>

        <PanelButton 
        buttonName="Chat With User"
        disabled={isCancellingRide || error}
        onClick={chatHandler} 
        />

        <div className="flex gap-x-3 w-full"> 

          <PanelButton 
          buttonName={error? "Go Back" : isCancellingRide ? "Cancelling Ride . . . " : "Cancel Ride"}
          disabled={isCancellingRide}
          onClick={error ? onGoBack : cancelRideHandler} 
          />

          <PanelButton 
          buttonName="Start the Ride"
          disabled={isCancellingRide}
          onClick={rideStartedHandler} 
          />

        </div>

      </div>
    
    </>
  )
}

export default GoingToUserPanel