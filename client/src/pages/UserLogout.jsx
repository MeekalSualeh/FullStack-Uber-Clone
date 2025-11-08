import { useEffect } from 'react'
import { userLogout } from "../api/logout.api"
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'

const UserLogout = () => {
    const {isLoggedin, setIsLoggedin, setRole} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() =>{
        const logout = async () =>{
            if(isLoggedin){
                try {
                    const response = await userLogout()
                    
                } catch (error) {
                    console.log(error)
                }
    
                setIsLoggedin(false);
                setRole(null)
            }
            navigate("/user-login")
        }

        logout()
    }, [])

  return <div>Logging Out...</div>
}

export default UserLogout
