import { useState } from 'react'
import Logout from "../components/Logout"
import Panel from "../components/Panel"
import UserSearchPanel from '../panels/UserSearchPanel'
import UserVehiclePanel from "../panels/UserVehiclePanel"

const UserHomepage = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [focusedOn, setFocusedOn] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const [activePanel, setActivePanel] = useState("minimizedSearch")

  const [isSearchPanelInView, setIsSearchPanelInView] = useState(true)
  const [isVehiclePanelInView, setIsVehiclePanelInView] = useState(false)
  const [isFindingdriverPanelInView, setIsFindingdriverPanelInView] = useState(false)
  const [isWaitingForDriverPanelInView, setIsWaitingForDriverFocusedInView] = useState(false)
  const [isOnTheRidePanelInView, setIsOnTheRideFocusedInView] = useState(false)
  const [isRideCompletedPanelInView, setIsRideCompletedPanelInView] = useState(false)

  // const panelArray = useRef(["minimizedSearch", "search", "vehicle", "findingDriver", "waitingForDriver", "onTheRide", "rideCompleted"])

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

      {(isSearchPanelInView && (
        <Panel 
        isActive={activePanel === "search"} 
        isMinimized={activePanel === "minimizedSearch"} 
        heading="Find A Trip"
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
        }}>

        <UserVehiclePanel
        vehicle={vehicleType}
        setVehicle={setVehicleType}
        submitButtonHandler={() =>{}}
        />

        </Panel>
      ))}



    </div>
  )
}

export default UserHomepage
