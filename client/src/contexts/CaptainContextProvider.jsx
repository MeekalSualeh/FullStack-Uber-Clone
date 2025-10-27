import { createContext, useState, useContext } from 'react'

const CaptainContext = createContext()

export const useCaptainContext = () => useContext(CaptainContext)

const CaptainContextProvider = ({ children }) => {

    const [captainData, setCaptainData] = useState(null)

  return (
      <CaptainContext.Provider value = {{captainData, setCaptainData}}>
        { children }
      </CaptainContext.Provider>
  )
}

export default CaptainContextProvider