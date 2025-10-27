import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

const UserContextProvider = ({ children }) => {

  const [userData, setUserData] = useState(null)

  return (
      <UserContext.Provider value = {{userData, setUserData}}>
        { children }
      </UserContext.Provider>
  )
}

export default UserContextProvider