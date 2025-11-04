import { createContext, useState, useContext } from 'react'

const rideContext = createContext()

export const useRideContext = () => useContext(rideContext)

const rideContextProvider = ({ children }) => {

  const [rideData, setRideData] = useState(null)
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