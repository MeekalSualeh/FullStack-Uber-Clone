import { createContext, useState, useContext } from 'react'

const rideContext = createContext()

export const useRideContext = () => useContext(rideContext)

const rideContextProvider = ({ children }) => {

  const [rideData, setRideData] = useState({
    pickup :{
      name:"Maalik Welfare Organization, F.B Area, Gulberg Block-12, Karachi, Pakistan",
      coordinates:[0,0],
      mainText: "Maalik Welfare Organization",
      secondaryText: "F.B Area, Gulberg Block-12, Karachi, Pakistan"
    },
    destination :{
      name:"UBIT, Circular Road, University Of Karachi",
      coordinates:[0,0],
      mainText: "UBIT",
      secondaryText: "Circular Road, University Of Karachi"
    },
    vehicle :{
      type:"car",
      color:"Black",
      plate:"ABC-123",
    },
    expectedDistance: 4400,
    expectedTime: 600,
    fare: 500
  }) // ise null krna h

  const [isCancellingRide, setIsCancellingRide] = useState(false)
  const [cancelledBy, setCancelledBy] = useState("")
  //timedOut, cancelledFindingDriver, cancelledByUser, cancelledByCaptain


  return (
      <rideContext.Provider value = {{rideData, setRideData, cancelledBy, setCancelledBy, isCancellingRide, setIsCancellingRide}}>
        { children }
      </rideContext.Provider>
  )
}

export default rideContextProvider

//     user
//     captain
//     pickup.name
//     pickup.coordinates
//     pickup.mainText
//     pickup.secondaryText
//     destination.name
//     destination.coordinates
//     destination.mainText
//     destination.secondaryText
//     vehicle.type
//     vehicle.color
//     vehicle.plate
//     vehicle.capacity
//     expectedDistance
//     expectedTime
//     fare
//     chat
//     status
//         enum:["waiting", "accepted", "on-the-way", "completed", "cancelled-by-user", "cancelled-by-captain", "no-drivers-nearby", "ride-timeout"]