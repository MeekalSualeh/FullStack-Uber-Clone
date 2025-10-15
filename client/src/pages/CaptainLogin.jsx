import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState("")
  
  const inputHandler = (e) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  const submitHandler = (e) =>{
    e.preventDefault()
    console.log(user)
    setUser({
    email: '',
    password: ''
  })
  }

  return (
    <div className='w-full min-h-screen flex flex-col px-5 py-3 font-[helvetica]'>
      <div><img src="../src/assets/uber-driver-svgrepo-com.svg" alt="uber-logo" 
      className='w-20'/></div>
      <div>
        <form
        onSubmit={submitHandler}
        className='flex flex-col w-full text-xl font-semibold mt-2 gap-y-5 text-gray-800'>

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
          disabled={!user.email || !user.password}
          className={`bg-orange-500 text-white font-semibold text-xl py-3 mt-6 rounded-sm outline-none focus:ring-2 focus:ring-blue-400 ${ (!user.email || !user.password) ? "cursor-not-allowed opacity-50": "cursor-pointer"}`}
          > Login
          </button>

        </form>

        <div className='mt-7 flex flex-col gap-y-2 tracking-tight mb-15'>
          <p>
            Join our fleet.{" "}
            <Link className='text-blue-400 hover:text-blue-600 cursor-pointer font-semibold text-lg'
            to="/captain-signup"
            >Become a captain</Link>
          </p>
          <p>
            Wanna go somewhere ?{" "}
            <Link className='text-blue-400 hover:text-blue-600 cursor-pointer font-semibold text-lg'
            to="/user-signup"
            >Signup as User</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin
