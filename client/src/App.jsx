import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserHomepage from './pages/UserHomepage'
import CaptainHomepage from './pages/CaptainHomepage'


const App = () => {
  return (
    <div>
      <Routes>  
        <Route path="/" element={ <Home /> } ></Route>
        <Route path="/user-login" element={ <UserLogin /> } ></Route>
        <Route path="/user-signup" element={ <UserSignup /> } ></Route>
        <Route path="/captain-login" element={ <CaptainLogin /> } ></Route>
        <Route path="/captain-signup" element={ <CaptainSignup />} ></Route>
        <Route path="/user-homepage" element={ <UserHomepage />} ></Route>
        <Route path="/captain-homepage" element={ <CaptainHomepage />} ></Route>
      </Routes>
      
    </div>
  )
}

export default App
