import { useEffect, useState } from "react"
import { getDistanceTimeAndFare } from "../api/user.api"
import PanelButton from "../components/PanelButton"
import VehicleType from "../components/VehicleType"
import carImg from "../../public/car.png"
import motoImg from "../../public/moto.webp"
import autoImg from "../../public/auto.webp"

const UserVehiclePanel = ({vehicle, setVehicle, submitButtonHandler, pickup, destination}) => {

  const [isLoading, setIsLoading] = useState(false) //ise true krna h and useEffect ko uncomment krna h
  const [fares, setFares] = useState({})
  const [distance, setDistance] = useState(null)
  const [time, setTime] = useState(null)

  // useEffect(() =>{
  //   const fetchData = async () =>{

  //     try {
  //       const response = await getDistanceTimeAndFare(pickup, destination)
  //       const { distance, time, fares } = response
  //       setFares(fares)
  //       setDistance(distance)
  //       setTime(time)
  
  //     } catch (error) {
  //       console.log(error) 
  
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  const onClick = (vehicleType) =>{
    setVehicle(vehicleType)
  }

  if(isLoading){
    return <div className="text-xl text-slate-800 mt-8 ml-7 font-semibold font-[helvetica]">Loading Vehicles & Fares...</div> 
  }

  return (
    <>
        <div className="flex flex-col gap-y-5 w-full mt-8 font-[helvetica]">
          
          <div className="flex gap-x-5 font-semibold text-lg ml-8 text-slate-700">
            <h1>Distance: {Math.ceil(distance/1000)} km</h1>
            <h1>Time: {Math.ceil(time/60)} mins</h1>
          </div>

{/* https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=341/height=192/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hZmE5NzhjMi1kM2RlLTRiNmItYTgwZS0wMDFlZjA1MzcwZmYuanBn   car image*/}


{/* https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hMjU1M2ExOC0yZjc3LTQ3MjItYTRiYS1mNzM2ZjRjYjQwNWUucG5n moto image */}

{/* https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n auto image */}

          <VehicleType 
          imgSrc={carImg}
          imgCover={true}
          vehicleName="Uber Premier"
          vehicleType="car"
          tagLine="Affordable, Car Rides"
          fare={fares.car}
          capacity={4}
          isFocused={vehicle === "car"}
          onClick={onClick}
          />

          <VehicleType 
          imgSrc={motoImg}
          vehicleName="Uber Moto"
          vehicleType="moto"
          tagLine="Affordable, Motor Rides"
          fare={fares.moto}
          capacity={1}
          isFocused={vehicle === "moto"}
          onClick={onClick}
          />

          <VehicleType 
          imgSrc={autoImg}
          vehicleName="Uber Auto"
          vehicleType="auto"
          tagLine="Affordable, Auto Rides"
          fare={fares.auto}
          capacity={3}
          isFocused={vehicle === "auto"}
          onClick={onClick}
          />

        </div>

        <div
        className='absolute bottom-10 w-screen flex justify-center'>
          <PanelButton 
          buttonName={(vehicle) ? "Find A Driver" : "Choose Vehicle"}
          disabled={!vehicle}
          onClick={submitButtonHandler} 
          />
        </div>
    
    </>
  )
}

export default UserVehiclePanel