import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorComponent from '../components/ErrorComponent'
import { userLogin } from "../api/login.api"

const UserLogin = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const inputHandler = (e) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e) =>{
    e.preventDefault()
    setIsSubmitting(true)
    console.log(user)

    try {
      const response = await userLogin(user)

      setUser({
      email: '',
      password: ''
      })

      navigate("/user-homepage")      

    } catch (error) {
      console.log(error)
      setError(error.error || "Login Failed")

    } finally{
      setIsSubmitting(false)
    }
    
  }

  return (
    <div className='w-full min-h-screen flex flex-col px-5 py-7 font-[helvetica]'>
      <div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/960px-Uber_logo_2018.png" alt="uber-logo" 
      className='w-18'/></div>
      <div>
        <form
        onSubmit={submitHandler}
        className='flex flex-col w-full text-xl font-semibold mt-8 gap-y-5 text-gray-800'>

          <label
          className=''>
            Enter Your Email: 
          <input 
          type="email" 
          name='email'
          className='w-full mt-3 text-lg outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
          placeholder='Email'
          value={user.email}
          onChange={inputHandler}
          />
          </label>

          <label
          className=''>
            Enter Password: 
          <input 
          type="password" 
          name='password'
          className='w-full mt-3 text-lg outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
          placeholder='Password'
          value={user.password}
          onChange={inputHandler}
          />
          </label>

          { error && <ErrorComponent error={error} />}

          <button
          type='submit'
          disabled={!user.email || !user.password || isSubmitting}
          className={`bg-black text-white font-semibold text-xl py-3 mt-6 rounded-sm outline-none focus:ring-2 focus:ring-blue-400 ${ (!user.email || !user.password) ? "cursor-not-allowed opacity-50": "cursor-pointer"}`}
          > {isSubmitting? "Logging in..." : "Login"}
          </button>

        </form>

        <div className='mt-7 flex flex-col gap-y-2 tracking-tight mb-15'>
          <p>
            Don't have an account ?{" "}
            <Link className='text-blue-400 hover:text-blue-600 cursor-pointer font-semibold text-lg'
            to="/user-signup"
            >Create One</Link>
          </p>
          <p>
            Join our fleet.{" "}
            <Link className='text-blue-400 hover:text-blue-600 cursor-pointer font-semibold text-lg'
            to="/captain-signup"
            >Become a captain</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
