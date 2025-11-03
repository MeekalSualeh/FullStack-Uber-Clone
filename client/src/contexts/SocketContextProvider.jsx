import { createContext, useRef, useEffect, useContext } from 'react'
import { connectSocket, getSocket, disconnectSocket } from "../config/socket.config"
import { useUserContext } from "../contexts/UserContextProvider"
import { useCaptainContext } from "../contexts/CaptainContextProvider"
import { useAuthContext } from "../contexts/AuthContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { useChatContext } from "../contexts/ChatContextProvider"

const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

const SocketContextProvider = ({ children }) => {

  const socket = useRef(null)

  const { role, isLoggedin, isLoading } = useAuthContext()
  const { setUserData } = useUserContext()
  const { setCaptainData } = useCaptainContext()
  const { setRideData } = useRideContext()
  const { setChatData } = useChatContext()
  
  useEffect(() =>{

    if(!isLoggedin || isLoading) return

    const s = connectSocket()
    socket.current = s
    
      const initialDataHandler = (data) =>{

        if(data.onRide){
          const { user, ride, chat, anotherPerson } = data

          if(role === "user"){  
            setUserData(user)
            setCaptainData(anotherPerson)
            
          } else if (role ==="captain"){
            setCaptainData(user)
            setUserData(anotherPerson)
          }

          setRideData(ride)
          setChatData(chat)

        } else {
          const { user } = data
          
          if(role ==="user") setUserData(user)
          else if(role ==="captain") setCaptainData(user)

        }
      }
  
      s.on("initial-data", initialDataHandler)
      s.on("connect", () => console.log(`Socket Connected: ${s.id}`))
      s.on("disconnect", (reason) => console.log(`Socket Disconnected: ${reason}`))
      s.io.on("reconnect", (attempts) => console.log(`Socket Reconnected; attempts: ${attempts}`))
      
      return () => {
        s.off("initial-data", initialDataHandler)
        s.off("connect")
        s.off("disconnect")
        s.io.off("reconnect")
        disconnectSocket()
      }

  }, [role, isLoggedin, isLoading])

  return (
      <SocketContext.Provider value = {{ socket: socket }}>
        { children }
      </SocketContext.Provider>
  )
}

export default SocketContextProvider