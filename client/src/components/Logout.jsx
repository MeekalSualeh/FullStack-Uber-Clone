import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';

const Logout = () => {

    const navigate = useNavigate();
    const authData = useAuthContext();

    const clickHandler = (e) =>{
        e.preventDefault();
        
        if(authData.role === "user"){
            navigate("/user-logout")
        } else if(authData.role === "captain") {
            navigate("/captain-logout")
        }
    }

  return (
    <>
        <button
        onClick={clickHandler}
        className='bg-red-600 rounded-lg py-2 px-4 text-white font-semibold tracking-tight text-lg'
        >Logout</button>
    </>
  )
}

export default Logout
