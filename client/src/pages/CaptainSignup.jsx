import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: '',
    color: '',
    numberPlate: '',
    capacity: ''
  })

  const [error, setError] = useState("")
  
  const inputHandler = (e) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  const submitHandler = (e) =>{
    e.preventDefault()
    console.log(user)
    setUser({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: '',
    color: '',
    numberPlate: '',
    capacity: ''
  })
  }

  return (
    <div className='w-full min-h-screen flex flex-col px-5 py-3 font-[helvetica]'>
      <div
      ><img src="../src/assets/uber-driver-svgrepo-com.svg" 
      className='w-20'/>
      </div>
      <div>
        <form
        onSubmit={submitHandler}
        className='flex flex-col w-full text-xl font-semibold mt-2 gap-y-5 text-gray-800'>

          <label
          className=''>
            Enter Your Name: 
            <div className='w-full flex gap-x-3 mt-3'>
              <input 
              type="text" 
              name='firstname'
              className='w-1/2 text-lg outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
              placeholder='First Name'
              value={user.firstname}
              onChange={inputHandler}
              />
              <input 
              type="text" 
              name='lastname'
              className='w-1/2 text-lg outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
              placeholder='Last Name'
              value={user.lastname}
              onChange={inputHandler}
              />
            </div>
          </label>

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

          <label
          className=''>
            Enter Vehicle Details: 

          <div className='flex flex-col w-full mt-1'>

              <div className='text-lg w-full mt-4 flex justify-between items-center'>
                <label>
                  Type: 
                </label>

                <input 
                type="text" 
                name='type'
                className='w-3/5 text-lg outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
                placeholder='i.e: car, moto, auto'
                value={user.type}
                onChange={inputHandler}
                />
              </div>

              <div className='text-lg w-full mt-4 flex justify-between items-center'>
              <label>
                Color: 
              </label>

              <input 
              type="text" 
              name='color'
              className='w-3/5 text-lg outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
              placeholder='i.e: dark-blue'
              value={user.color}
              onChange={inputHandler}
              />
              </div>
            
            <div className='text-lg w-full mt-4 flex justify-between items-center'>
              <label>
                Number-plate: 
              </label>

              <input 
              type="text" 
              name='numberPlate'
              className='w-3/5 outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
              placeholder='i.e: abc-123'
              value={user.numberPlate}
              onChange={inputHandler}
              />
            </div>

            <div className='w-full mt-4 flex justify-between items-center'>
              <label>
                Capacity: 
              </label>

              <input 
              type="text" 
              name='capacity'
              className='w-3/5 outline-none bg-[#eeeeee] px-3 py-3 placeholder:text-base font-medium focus:ring-2 focus:ring-blue-400 rounded-md transition-border duration-200 ease-out'
              placeholder='i.e: 2'
              value={user.capacity}
              onChange={inputHandler}
              />
            </div>

          </div>
          </label>

          { error && <ErrorComponent error={error} />}

          <button
          type='submit'
          disabled={!user.firstname || !user.lastname || !user.email || !user.password || !user.type || !user.color || !user.numberPlate || !user.capacity}
          className={`bg-orange-500 text-white font-semibold text-xl py-3 mt-6 rounded-sm outline-none focus:ring-2 focus:ring-blue-400 ${ (!user.firstname || !user.lastname || !user.email || !user.password || !user.type || !user.color || !user.numberPlate || !user.capacity) ? "cursor-not-allowed opacity-50": "cursor-pointer"}`}
          > Create Account
          </button>

        </form>

        <div className='mt-7 flex flex-col gap-y-2 tracking-tight mb-15'>
          <p>
            Already a captain ? Go to{" "}
            <Link className='text-blue-400 hover:text-blue-600 cursor-pointer font-semibold text-lg'
            to="/captain-login"
            >Login</Link>
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

export default CaptainSignup
