import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from "./contexts/AuthContextProvider.jsx"
import CaptainContextProvider from "./contexts/CaptainContextProvider.jsx"
import ChatContextProvider from "./contexts/ChatContextProvider.jsx"
import RideContextProvider from "./contexts/RideContextProvider.jsx"
import SocketContextProvider from "./contexts/SocketContextProvider.jsx"
import UserContextProvider from "./contexts/UserContextProvider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CaptainContextProvider>
        <ChatContextProvider>
          <RideContextProvider>
            <SocketContextProvider>
              <UserContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </UserContextProvider>
            </SocketContextProvider>
          </RideContextProvider>
        </ChatContextProvider>
      </CaptainContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
