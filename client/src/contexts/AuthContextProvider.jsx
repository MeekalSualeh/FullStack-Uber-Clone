import { createContext, useState, useEffect, useContext } from 'react'
import { fetchAuthData } from "../api/auth.api"

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() =>{
    const fetchData = async () =>{

      try {
        const response = await fetchAuthData()
  
        if(response.role){
          setRole(response.role);
          setIsLoggedin(true);
        } 
        else{
          setRole(null);
          setIsLoggedin(false);

        }
  
      } catch (error) {
        setRole(null);
        setIsLoggedin(false);
        
      } finally{
        setIsLoading(false)
      }
    }

    fetchData();

  }, [])

  return (
      <AuthContext.Provider value = {{role, setRole, isLoggedin, setIsLoggedin, isLoading}}>
        { children }
      </AuthContext.Provider>
  )
}

export default AuthContextProvider