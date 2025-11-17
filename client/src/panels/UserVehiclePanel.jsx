import { useEffect, useState } from "react"
import { getDistanceTimeFareAndCoordinates } from "../api/user.api"
import PanelButton from "../components/PanelButton"
import VehicleType from "../components/VehicleType"
import carImg from "/car.png"
import motoImg from "/moto.webp"
import autoImg from "/auto.webp"

const UserVehiclePanel = ({
  vehicleType, 
  setVehicleType, 
  submitButtonHandler, 
  pickup, 
  destination,
  setFare,
  time,
  setTime,
  distance,
  setDistance,
  setPickupCoordinates,
  setDestinationCoordinates
}) => {

  const [isLoading, setIsLoading] = useState(true) //ise true krna h and useEffect ko uncomment krna h
  const [fares, setFares] = useState({})

  useEffect(() =>{
    const fetchData = async () =>{

      try {
        const response = await getDistanceTimeFareAndCoordinates(pickup, destination)
        const { distance, time, fares, pickupCoordinates, destinationCoordinates } = response
        setFares(fares)
        setDistance(distance)
        setTime(time)
        setPickupCoordinates(pickupCoordinates)
        setDestinationCoordinates(destinationCoordinates)

      } catch (error) {
        console.log(error) 
  
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const onClick = (vehicleType, fare) =>{
    setVehicleType(vehicleType)
    setFare(fare)
  }

  if(isLoading){
    return <div className="text-xl text-slate-800 mt-8 ml-7 font-semibold font-[helvetica]">Loading Vehicles & Fares...</div> 
  }

  return (
    <>
        <div className="flex flex-col gap-y-5 w-full mt-8 font-[helvetica]">
          
          <div className="flex gap-x-6 font-semibold text-lg text-black text-center justify-center mb-3">
            <h1>Distance: {Math.ceil(distance/1000)} km</h1>
            <h1>Time: {Math.ceil(time/60)} mins</h1>
          </div>

          <VehicleType 
          imgSrc={carImg}
          imgCover={true}
          vehicleName="Uber Premier"
          vehicleType="car"
          tagLine="Affordable, Car Rides"
          fare={fares.car}
          capacity={4}
          isFocused={vehicleType === "car"}
          onClick={onClick}
          />

          <VehicleType 
          imgSrc={motoImg}
          vehicleName="Uber Moto"
          vehicleType="moto"
          tagLine="Affordable, Motor Rides"
          fare={fares.moto}
          capacity={1}
          isFocused={vehicleType === "moto"}
          onClick={onClick}
          />

          <VehicleType 
          imgSrc={autoImg}
          vehicleName="Uber Auto"
          vehicleType="auto"
          tagLine="Affordable, Auto Rides"
          fare={fares.auto}
          capacity={3}
          isFocused={vehicleType === "auto"}
          onClick={onClick}
          />

        </div>

        <div
        className='absolute bottom-10 w-screen flex justify-center px-4'>
          <PanelButton 
          buttonName={vehicleType ? "Find A Driver" : "Choose Vehicle"}
          disabled={!vehicleType || isLoading}
          onClick={submitButtonHandler} 
          />
        </div>
    
    </>
  )
}

export default UserVehiclePanel