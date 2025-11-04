import { createContext, useState, useContext } from 'react'

const CaptainContext = createContext()

export const useCaptainContext = () => useContext(CaptainContext)

const CaptainContextProvider = ({ children }) => {

  const [captainData, setCaptainData] = useState(null)
  const [captainLocation, setCaptainLocation] = useState([0, 0])

  return (
      <CaptainContext.Provider value = {{captainData, setCaptainData, captainLocation, setCaptainLocation}}>
        { children }
      </CaptainContext.Provider>
  )
}

export default CaptainContextProvider