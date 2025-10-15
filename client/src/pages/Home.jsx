import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col font-[helvetica] h-screen w-full'>
        <div className='bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
        h-3/4 w-full'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/960px-Uber_logo_2018.png" alt="uber-logo" className="w-18 relative left-7 top-7"/></div>
        <div className='w-full h-1/4 px-5 flex flex-col justify-center items-center gap-y-4'>
            <h1 className='text-black text-3xl font-semibold tracking-tight'>Get Started With Uber</h1>
            <Link to="/user-login"
            className='bg-black text-xl font-semibold text-white rounded-md flex items-center justify-center py-4 w-full cursor-pointer'
            >Get Started</Link>
        </div>
    </div>
  )
}

export default Home
