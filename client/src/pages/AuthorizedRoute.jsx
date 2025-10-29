import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from "../contexts/AuthContextProvider"

const AuthorizedRoute = ({ roles=[] }) => {

  const authData = useAuthContext()
  
  if(authData.isLoading){
    return <div>Loading...</div>
  }

  if(!roles.includes(authData.role)){

    if(authData.role === "user"){
      return <Navigate to="/user-homepage" replace/>
    } else if(authData.role === "captain") {
      return <Navigate to="/captain-homepage" replace/>
    } else {
      return <Navigate to="/" replace/>
    }
  }
  
  return <Outlet />
}

export default AuthorizedRoute