import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserHomepage from './pages/UserHomepage'
import CaptainHomepage from './pages/CaptainHomepage'
import ProtectedRoute from './pages/ProtectedRoute'
import AuthorizedRoute from './pages/AuthorizedRoute'


const App = () => {
  return (
    <div>
      <Routes>  
        <Route path="/" element={ <Home /> } ></Route>
        <Route path="/user-login" element={ <UserLogin /> } ></Route>
        <Route path="/user-signup" element={ <UserSignup /> } ></Route>
        <Route path="/captain-login" element={ <CaptainLogin /> } ></Route>
        <Route path="/captain-signup" element={ <CaptainSignup />} ></Route>

        {/* Protected Routes */}
        <Route element={ <ProtectedRoute /> } > 

          {/* Captain Only Routes */}
          <Route element={ <AuthorizedRoute roles={["captain"]} /> } >
            <Route path="/captain-homepage" element={ <CaptainHomepage />} ></Route>
          </Route>

          {/* User Only Routes */}
          <Route element={ <AuthorizedRoute roles={["user"]} /> } >
            <Route path="/user-homepage" element={ <UserHomepage />} ></Route>
          </Route>

        </Route>
      </Routes>
      
    </div>
  )
}

export default App
