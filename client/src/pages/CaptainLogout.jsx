import { useEffect } from 'react'
import { captainLogout } from "../api/logout.api"
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'

const CaptainLogout = () => {
    const {setIsLoggedin, setRole} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() =>{
        const logout = async () =>{
            try {
                const response = await captainLogout()
            } catch (error) {
                
            }

            setIsLoggedin(false);
            setRole(null)
            navigate("/captain-login")
        }

        logout()
    }, [])

  return <div>Logging Out...</div>
}

export default CaptainLogout
