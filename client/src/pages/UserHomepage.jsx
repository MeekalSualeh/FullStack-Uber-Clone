import { useState } from 'react'
import Logout from "../components/Logout"
import Panel from "../components/Panel"
import UserSearchPanel from '../panels/UserSearchPanel'
import UserVehiclePanel from "../panels/UserVehiclePanel"
import UserFindingDriverPanel from "../panels/UserFindingDriverPanel"
import UserWaitingForDriverPanel from "../panels/UserWaitingForDriverPanel"
import UserOnTheRidePanel from "../panels/UserOnTheRidePanel"
import UserRideCompletedPanel from "../panels/UserRideCompletedPanel"
import RideTimedOutPanel from "../panels/RideTimedOutPanel"
import RideCancelledByUserPanel from "../panels/RideCancelledByUserPanel"

const UserHomepage = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [focusedOn, setFocusedOn] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [fare, setFare] = useState(null)

  const [activePanel, setActivePanel] = useState("minimizedSearch")

  const [isSearchPanelInView, setIsSearchPanelInView] = useState(true)
  const [isVehiclePanelInView, setIsVehiclePanelInView] = useState(false)
  const [isFindingDriverPanelInView, setIsFindingDriverPanelInView] = useState(false)
  const [isWaitingForDriverPanelInView, setIsWaitingForDriverPanelInView] = useState(false)
  const [isOnTheRidePanelInView, setIsOnTheRidePanelInView] = useState(false)
  const [isRideCompletedPanelInView, setIsRideCompletedPanelInView] = useState(false)
  const [isRideTimedOutPanelInView, setIsRideTimedOutPanelInView] = useState(false)
  const [isRideCancelledByUserPanelInView, setIsRideCancelledByUserPanelInView] = useState(false)

  const [isRideGettingCancelled, setIsRideGettingCancelled] = useState(false)
  // const panelArray = useRef(["minimizedSearch", "search", "vehicle", "findingDriver", "rideTimedOut", "rideCancelledByUser",  "waitingForDriver", "minimizedWaitingForDriver", "onTheRide", "minimizedOnTheRide", "rideCompleted"])

  const cancelRide = async () =>{
    
  }

  const onRideCancelledByUser = async () =>{
    setIsRideCancelledByUserPanelInView(true)
    setActivePanel("rideCancelledByUser")
    setIsRideGettingCancelled(true)

    await cancelRide()

    setIsRideGettingCancelled(false)
  }

  return (
    <div className='flex flex-col h-screen w-screen text-[helvetica] relative overflow-hidden'>
      <div className='absolute mt-5 left-5 right-5 flex justify-between items-center'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/960px-Uber_logo_2018.png"
        alt="Uber-logo" 
        className='w-18 h-fit'/>
        
        <Logout />
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
        vehicle={vehicleType}
        setVehicle={setVehicleType}
        pickup={pickup}
        destination={destination}
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
        heading="Finding Driver..."
        onInActive={() =>{
          setIsFindingDriverPanelInView(false)
        }}
        >

        <UserFindingDriverPanel
        onCancelTheRide={() =>{
          setIsVehiclePanelInView(true)
          setActivePanel("vehicle")
        }}
        />

        </Panel>
      ))}

      {/* Waiting For Driver Panel */}
      {(isWaitingForDriverPanelInView && (
        <Panel 
        isActive={activePanel === "waitingForDriver"}  
        heading="Waiting For Driver"
        isMinimized = {activePanel === "minimizedWaitingForDriver"}
        onInActive={() =>{
          setIsWaitingForDriverPanelInView(false)
        }}
        >

        <UserWaitingForDriverPanel
        onRideCancelledByUser={onRideCancelledByUser}
        />

        </Panel>
      ))}

      {/* Ride Cancelled By User Panel */}
      {(isRideCancelledByUserPanelInView && (
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
        vehicle={vehicleType}
        setVehicle={setVehicleType}
        submitButtonHandler={() =>{
          setIsFindingdriverPanelInView(true)
          setActivePanel("findingDriver")
        }}
        />

        </Panel>
      ))}

      {/* Waiting For Driver Panel */}
      {(isWaitingForDriverPanelInView && (
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
        vehicle={vehicleType}
        setVehicle={setVehicleType}
        submitButtonHandler={() =>{
          setIsFindingdriverPanelInView(true)
          setActivePanel("findingDriver")
        }}
        />

        </Panel>
      ))}

    </div>
  )
}

export default UserHomepage
