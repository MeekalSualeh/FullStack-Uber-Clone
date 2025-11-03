import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from "../contexts/AuthContextProvider"

const ProtectedRoute = ({ children }) => {

  const authData = useAuthContext()
  
  if(authData.isLoading){
    return <div>Loading...</div>
  }

  if(!authData.isLoggedin){
    return <Navigate to="/user-login" replace/>
  }
  
  // return <Outlet />
  return children
}

export default ProtectedRoute