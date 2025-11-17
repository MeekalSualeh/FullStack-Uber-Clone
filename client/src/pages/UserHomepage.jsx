import { useState, useRef, useEffect } from 'react'
import Logout from "../components/Logout"

import Panel from "../components/Panel"
import UserSearchPanel from '../panels/UserSearchPanel'
import UserVehiclePanel from "../panels/UserVehiclePanel"
import UserFindingDriverPanel from "../panels/UserFindingDriverPanel"
import UserWaitingForDriverPanel from "../panels/UserWaitingForDriverPanel"
import UserOnTheRidePanel from "../panels/UserOnTheRidePanel" 
import UserRideCompletedPanel from "../panels/UserRideCompletedPanel"
import RideCancelledPanel from "../panels/RideCancelledPanel"
import ChatPanel from "../panels/ChatPanel"

import { useChatSocket, useCommonSocket, useErrorSocket, useUserSocket } from "../hooks/SocketHooks"
import { useRideContext } from '../contexts/RideContextProvider'
import { useSocketContext } from '../contexts/SocketContextProvider'
import { useCaptainContext } from '../contexts/CaptainContextProvider'

// rideCancelledByUser and rideCancelledByCaptain ko esa banana k rideData baad m cancel hun and page panel pehle change hojaye, real time data show krna in goingToUser and on-ride, chat ko realtime banana, login and page refresh par data k hisaab se panel kholay and data consistent rhay


const UserHomepage = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [mainAndSecondaryText, setMainAndSecondaryText] = useState({})
  const [focusedOn, setFocusedOn] = useState("")

  const [pickupCoordinates, setPickupCoordinates] = useState(null)
  const [destinationCoordinates, setDestinationCoordinates] = useState(null)
  const [vehicleType, setVehicleType] = useState("")
  const [fare, setFare] = useState(0) // hardcoded h ise null krna
  const [time, setTime] = useState(0) // hardcoded h ise null krna
  const [distance, setDistance] = useState(0) // hardcoded h ise null krna

  const [activePanel, setActivePanel] = useState("minimizedSearch") // change it to minimizedSearch

  const [isSearchPanelInView, setIsSearchPanelInView] = useState(true) // isko true and baki sab ko false krna h
  const [isVehiclePanelInView, setIsVehiclePanelInView] = useState(false)
  const [isFindingDriverPanelInView, setIsFindingDriverPanelInView] = useState(false)
  const [isWaitingForDriverPanelInView, setIsWaitingForDriverPanelInView] = useState(false)
  const [isOnTheRidePanelInView, setIsOnTheRidePanelInView] = useState(false)
  const [isRideCompletedPanelInView, setIsRideCompletedPanelInView] = useState(false)
  const [isRideCancelledPanelInView, setIsRideCancelledPanelInView] = useState(false)
  const [isChatPanelInView, setIsChatPanelInView] = useState(false)

  // const panelArray = useRef(["minimizedSearch", "search", "vehicle", "findingDriver", "rideTimedOut", "waitingForDriver", "minimizedWaitingForDriver", "onTheRide", "minimizedOnTheRide", "rideCompleted", "rideCancelledByUser", "rideCancelledByCaptain", "chat"])

  const {socket} = useSocketContext()
  const {rideData, setRideData, cancelledBy, setCancelledBy, setIsCancellingRide} = useRideContext()
  const { setCaptainData } = useCaptainContext()
  
  
  const logoutRef = useRef(null)

  const onRideCancelledByUser = () =>{
    setIsCancellingRide(true)
    socket.current?.emit("cancelled-by-user", {rideId: rideData._id})
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
    setIsWaitingForDriverPanelInView(true)
    setActivePanel("waitingForDriver")
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
  useUserSocket(
    rideCancelledByUserSocketHandler, 
    rideCancelledByCaptainSocketHandler, 
    rideAcceptedSocketHandler, 
    rideStartedSocketHandler, 
    rideCompletedSocketHandler
  )
  useChatSocket()
  useCommonSocket()

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


      {/* Search Panel */}
      {(isSearchPanelInView && (
        <Panel 
        isActive={activePanel === "search"} 
        isMinimized={activePanel === "minimizedSearch"} 
        heading="Find A Trip"
        defaultY="63%"
        onInActive={() =>{
          setIsSearchPanelInView(false)
        }}
        onPanelClose={() =>{
          setActivePanel("minimizedSearch")
          setFocusedOn("")
        }}>

          <UserSearchPanel 
          pickup={pickup}
          destination={destination}
          setPickup={setPickup}
          setDestination={setDestination}
          mainAndSecondaryText={mainAndSecondaryText}
          setMainAndSecondaryText={setMainAndSecondaryText}
          focusedOn={focusedOn}
          searchPanelClickHandler={(e) =>{
            setActivePanel("search")
            setFocusedOn(e.target.name)
          }}
          submitButtonHandler={() =>{
            setActivePanel("vehicle")
            setIsVehiclePanelInView(true)
            setFocusedOn("")
          }}
          />

        </Panel>
      ))}


      {/* Vehicle Panel */}
      {(isVehiclePanelInView && (
        <Panel 
        isActive={activePanel === "vehicle"}  
        heading="Choose a Vehicle"
        onInActive={() =>{
          setIsVehiclePanelInView(false)
        }}
        onPanelClose={() =>{
          setIsSearchPanelInView(true)
          setActivePanel("search")
          setVehicleType("")
        }}>

        <UserVehiclePanel
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
        pickup={pickup}
        destination={destination}
        setFare={setFare}
        time={time}
        setTime={setTime}
        distance={distance}
        setDistance={setDistance}
        setPickupCoordinates={setPickupCoordinates}
        setDestinationCoordinates={setDestinationCoordinates}
        submitButtonHandler={() =>{
          setIsFindingDriverPanelInView(true)
          setActivePanel("findingDriver")
        }}
        />

        </Panel>
      ))}


      {/* Finding Driver Panel */}
      {(isFindingDriverPanelInView && (
        <Panel 
        isActive={activePanel === "findingDriver"}
        heading="Finding Driver"
        onInActive={() => setIsFindingDriverPanelInView(false) }
        >

        <UserFindingDriverPanel
        vehicleType={vehicleType}
        mainAndSecondaryText={mainAndSecondaryText}
        time={time}
        distance={distance}
        fare={fare}
        pickup={pickup}
        pickupCoordinates={pickupCoordinates}
        destination={destination}
        destinationCoordinates={destinationCoordinates}
        onGoBack={() =>{
          setIsVehiclePanelInView(true)
          setActivePanel("vehicle")
        }}
        onCancelFindingDriver={onRideCancelledByUser}
        />

        </Panel>
      ))}


      {/* Waiting For Driver Panel */}
      {(isWaitingForDriverPanelInView && (
        <Panel 
        isActive={activePanel === "waitingForDriver"}  
        heading="Waiting For Driver"
        isMinimized = {activePanel === "minimizedWaitingForDriver"}
        onInActive={() => setIsWaitingForDriverPanelInView(false) }
        onPanelMinimize={() => setActivePanel("minimizedWaitingForDriver") }
        onPanelMaximize={() => setActivePanel("waitingForDriver") }
        >

        <UserWaitingForDriverPanel
        cancelRideHandler={onRideCancelledByUser}
        onGoBack={() =>{
          setIsSearchPanelInView(true)
          setActivePanel("minimizedSearch")
        }}
        chatHandler={()=>{
          setIsChatPanelInView(true)
          setActivePanel("chat")
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
        cancelRideHandler={onRideCancelledByUser}
        onGoBack={() =>{
          setIsSearchPanelInView(true)
          setActivePanel("minimizedSearch")
        }}
        chatHandler={()=>{
          setIsChatPanelInView(true)
          setActivePanel("chat")
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
          setIsRideCompletedPanelInView(false) 
          setCaptainData(null)
          setRideData({})
        }}
        >

        <UserRideCompletedPanel
        onFinish={() =>{
          setIsSearchPanelInView(true)
          setActivePanel("minimizedSearch")
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
          setIsSearchPanelInView(true)
          setActivePanel("minimizedSearch")
          cancellationBy=""
        }}
        />

        </Panel>
      ))}


      {/* Chat Panel */}
      {(isChatPanelInView && (
        <Panel 
        isActive={activePanel === "chat"}
        heading="Chat With Captain"
        onInActive={() =>{
          setIsChatPanelInView(false)
        }}
        onPanelClose={() =>{
          if(rideData.status === "accepted"){
            setIsWaitingForDriverPanelInView(true)
            setActivePanel("waitingForDriver")
            
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

export default UserHomepage