import { useState, useRef, useEffect } from 'react'
import Logout from "../components/Logout"

import Panel from "../components/Panel"

import UserOnTheRidePanel from "../panels/UserOnTheRidePanel" 
import UserRideCompletedPanel from "../panels/UserRideCompletedPanel"
import RideCancelledPanel from "../panels/RideCancelledPanel"
import ChatPanel from "../panels/ChatPanel"

import { useCaptainSocket, useChatSocket, useCommonSocket, useErrorSocket, useUserSocket } from "../hooks/SocketHooks"
import { useRideContext } from '../contexts/RideContextProvider'
import { useSocketContext } from '../contexts/SocketContextProvider'
import RideRequestsPanel from '../panels/RideRequestsPanel'
import GoingToUserPanel from '../panels/GoingToUserPanel'
import { useUserContext } from '../contexts/UserContextProvider'


const CaptainHomepage = () => {

  const [rideRequests, setRideRequests] = useState([])

  const [activePanel, setActivePanel] = useState("minimizedRideRequests") // change it to minimizedSearch

  const [isRideRequestsPanelInView, setIsRideRequestsPanelInView] = useState(true)
  const [isGoingToUserPanelInView, setIsGoingToUserPanelInView] = useState(false)
  const [isOnTheRidePanelInView, setIsOnTheRidePanelInView] = useState(false)
  const [isRideCompletedPanelInView, setIsRideCompletedPanelInView] = useState(false)
  const [isRideCancelledPanelInView, setIsRideCancelledPanelInView] = useState(false)
  const [isChatPanelInView, setIsChatPanelInView] = useState(false)

  // const panelArray = useRef(["minimizedRideRequests", "rideRequests", "goingToUser", "minimizedGoingToUser", "onTheRide", "minimizedOnTheRide", "rideCompleted", "rideCancelledByUser", "rideCancelledByCaptain", "chat"])

  const {socket} = useSocketContext()
  const {rideData, setRideData, cancelledBy, setCancelledBy, setIsCancellingRide} = useRideContext()
  const { setUserData } = useUserContext()

  const logoutRef = useRef(null)

  const onRideCancelledByCaptain = () =>{
    setIsCancellingRide(true)
    socket.current?.emit("cancelled-by-captain", {rideId: rideData._id})
  }

  const rideCancelledByUserSocketHandler = () =>{
    setIsRideCancelledPanelInView(true)
    setActivePanel("rideCancelledByUser")
  }
  
  const rideCancelledByCaptainSocketHandler = () =>{
    setIsRideCancelledPanelInView(true)
    setActivePanel("rideCancelledByCaptain")
  }

  const rideAcceptedSocketHandler = () =>{
    setIsGoingToUserPanelInView(true)
    setActivePanel("goingToUser")
    setRideRequests([]);
  }

  const rideStartedSocketHandler = () =>{
    setIsOnTheRidePanelInView(true)
    setActivePanel("onTheRide")
  }

  const rideCompletedSocketHandler = () =>{
    setIsRideCompletedPanelInView(true)
    setActivePanel("rideCompleted")
  }

  // Socket Event Hooks
  useErrorSocket()
  useCaptainSocket(
    setRideRequests,
    rideCancelledByUserSocketHandler, 
    rideCancelledByCaptainSocketHandler, 
    rideAcceptedSocketHandler, 
    rideStartedSocketHandler, 
    rideCompletedSocketHandler
  )
  useChatSocket()
  useCommonSocket()

  // ride accepter and decliner banana h. ride timeout pr ride ka hatna check krna h

  let cancellationBy;

  cancellationBy = cancelledBy === "cancelledByUser" ? "User" : "Captain"

  // useEffect(() =>{ // socket m data anay par values set krnay k liye

  //   switch(rideData.status){
  //     case "" :

  //   }

  // }, [rideData])


  return (
    <div className='flex flex-col h-screen w-screen text-[helvetica] relative overflow-hidden'>
      <div className='absolute mt-5 left-5 right-5 flex justify-between items-center'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/960px-Uber_logo_2018.png"
        alt="Uber-logo" 
        className='w-18 h-fit'/>
        
        <Logout ref={logoutRef} />
      </div>

      <div className='h-112'>
        <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="uber-map" 
        className='h-full'/>
      </div>


      {/* Ride Requests Panel */}
      {(isRideRequestsPanelInView && (
        <Panel 
        isActive={activePanel === "rideRequests"}  
        heading="Ride Requests"
        isMinimized = {activePanel === "minimizedRideRequests"}
        defaultY="63%"
        onInActive={() => setIsRideRequestsPanelInView(false) }
        onPanelMinimize={() => setActivePanel("minimizedRideRequests") }
        onPanelMaximize={() => setActivePanel("rideRequests") }
        >

        <RideRequestsPanel
        rideRequests={rideRequests}
        />

        </Panel>
      ))}

      
      {/* Going To User Panel */}
      {(isGoingToUserPanelInView && (
        <Panel 
        isActive={activePanel === "goingToUser"}  
        heading="Going To User"
        isMinimized = {activePanel === "minimizedGoingToUser"}
        onInActive={() => setIsGoingToUserPanelInView(false) }
        onPanelMinimize={() => setActivePanel("minimizedGoingToUser") }
        onPanelMaximize={() => setActivePanel("goingToUser") }
        >

        <GoingToUserPanel
        cancelRideHandler={onRideCancelledByCaptain}
        onGoBack={() =>{
          setIsRideRequestsPanelInView(true)
          setActivePanel("minimizedRideRequests")
        }}
        chatHandler={()=>{
          setIsChatPanelInView(true)
          setActivePanel("chat")
        }}
        rideStartedHandler={()=>{
          socket?.current?.emit("ride-started", { rideId: rideData._id })
        }}
        />

        </Panel>
      ))}


      {/* User On The Ride Panel */}
      {(isOnTheRidePanelInView && (
        <Panel 
        isActive={activePanel === "onTheRide"}  
        heading="To The Destination"
        isMinimized = {activePanel === "minimizedOnTheRide"}
        onInActive={() => setIsOnTheRidePanelInView(false) }
        onPanelMinimize={() => setActivePanel("minimizedOnTheRide") }
        onPanelMaximize={() => setActivePanel("onTheRide") }
        >

        <UserOnTheRidePanel
        chatButtonName="Chat with User"
        heading="Have a safe journey"
        cancelRideHandler={onRideCancelledByCaptain}
        onGoBack={() =>{
          setRideRequests(true)
          setActivePanel("minimizedRideRequests")
        }}
        chatHandler={()=>{
          setIsChatPanelInView(true)
          setActivePanel("chat")
        }}
        rideCompletedHandler={() =>{
          socket?.current?.emit("ride-completed", {rideId: rideData._id})
        }}
        />

        </Panel>
      ))}


      {/* Ride Completed Panel */}
      {(isRideCompletedPanelInView && (
        <Panel 
        isActive={activePanel === "rideCompleted"}  
        heading="Ride Completion"
        onInActive={() => {
          setIsOnTheRidePanelInView(false)
          setRideData({})
          setUserData(null)
        }}
        >

        <UserRideCompletedPanel
        role="captain"
        onFinish={() =>{
          setIsRideRequestsPanelInView(true)
          setActivePanel("minimizedRideRequests")
        }}
        />

        </Panel>
      ))}


      {/* Ride Cancelled Panel */}
      {(isRideCancelledPanelInView && (
        <Panel 
        isActive={activePanel === "rideCancelledByUser" || activePanel === "rideCancelledByCaptain"}  
        // isActive={cancellationBy}  
        heading={`Cancellation of Ride By ${cancellationBy}`} // iski default value hatani h
        onInActive={() =>{
          setIsRideCancelledPanelInView(false)
        }}>

        <RideCancelledPanel
        rideCancelledBy={cancellationBy}
        onGoBack={() =>{
          setCancelledBy("")
          setIsRideRequestsPanelInView(true)
          setActivePanel("minimizedRideRequests")
          cancellationBy=""
        }}
        />

        </Panel>
      ))}


      {/* Chat Panel */}
      {(isChatPanelInView && (
        <Panel 
        isActive={activePanel === "chat"}  
        heading="Chat With User"
        onInActive={() =>{
          setIsChatPanelInView(false)
        }}
        onPanelClose={() =>{
          if(rideData.status === "accepted"){
            setIsGoingToUserPanelInView(true)
            setActivePanel("goingToUser")
            
          } else if (rideData.status === "on-the-way"){
            setIsOnTheRidePanelInView(true)
            setActivePanel("onTheRide")
          }
        }}>

        <ChatPanel/>

        </Panel>
      ))}

    </div>
  )
}

export default CaptainHomepage

// 67.068105 lng
// 24.944897 lat