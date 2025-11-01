import { useCallback, useEffect, useState } from "react"
import PanelButton from "../components/PanelButton"
import VehicleType from "../components/VehicleType"

const UserFindingDriverPanel = ({vehicle, setVehicle, submitButtonHandler}) => {

  const [isLoading, setIsLoading] = useState(false)

  const onClick = (vehicleType) =>{
    setVehicle(vehicleType)
  }

  if(isLoading){
    return <div className="text-xl text-slate-800">Loading Vehicles & Fares</div> 
  }

  return (
    <>
        <div className="flex flex-col gap-y-5 w-full mt-8">
            
          <VehicleType 
          imgSrc="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=341/height=192/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hZmE5NzhjMi1kM2RlLTRiNmItYTgwZS0wMDFlZjA1MzcwZmYuanBn"
          vehicleName="Uber Premier"
          vehicleType="car"
          tagLine="Affordable, Car Rides"
          fare={3000}
          capacity={4}
          isFocused={vehicle === "car"}
          onClick={onClick}
          />

          <VehicleType 
          imgSrc="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hMjU1M2ExOC0yZjc3LTQ3MjItYTRiYS1mNzM2ZjRjYjQwNWUucG5n"
          vehicleName="Uber Moto"
          vehicleType="moto"
          tagLine="Affordable, Motor Rides"
          fare={100}
          capacity={1}
          isFocused={vehicle === "moto"}
          onClick={onClick}
          />

          <VehicleType 
          imgSrc="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          vehicleName="Uber Auto"
          vehicleType="auto"
          tagLine="Affordable, Auto Rides"
          fare={200}
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

export default UserFindingDriverPanel
