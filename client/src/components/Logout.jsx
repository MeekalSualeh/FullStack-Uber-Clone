import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useRideContext } from '../contexts/RideContextProvider';
import { useUserContext } from '../contexts/UserContextProvider';
import { useCaptainContext } from '../contexts/CaptainContextProvider';
import { useChatContext } from '../contexts/ChatContextProvider';
import { forwardRef } from 'react';

const Logout = forwardRef((props, ref) => {

    const navigate = useNavigate();
    const { role } = useAuthContext();
    const { setUserData } = useUserContext()
    const { setCaptainData } = useCaptainContext()
    const { setRideData } = useRideContext()
    const { setChatData } = useChatContext()

    const clickHandler = (e) =>{
        e.preventDefault();
        
        setUserData(null)
        setCaptainData(null)
        setRideData({})
        setChatData({
          messages:[]
        })

        if(role === "user") navigate("/user-logout")
        else if(role === "captain") navigate("/captain-logout")
    }

  return (
    <>
        <button
        ref={ref}
        onClick={clickHandler}
        className='bg-red-600 rounded-lg py-2 px-4 text-white font-semibold tracking-tight text-lg'
        >Logout</button>
    </>
  )
})

export default Logout
