import { createContext, useState, useContext } from 'react'

const rideContext = createContext()

export const useRideContext = () => useContext(rideContext)

const rideContextProvider = ({ children }) => {

  const [rideData, setRideData] = useState(null)

  return (
      <rideContext.Provider value = {{rideData, setRideData}}>
        { children }
      </rideContext.Provider>
  )
}

export default rideContextProvider