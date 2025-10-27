import { createContext, useState, useContext } from 'react'

const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

const SocketContextProvider = ({ children }) => {

  const [socketData, setSocketData] = useState(null)

  return (
      <SocketContext.Provider value = {{socketData, setSocketData}}>
        { children }
      </SocketContext.Provider>
  )
}

export default SocketContextProvider