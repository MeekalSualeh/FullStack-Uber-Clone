import { useCallback, useEffect, useState } from "react"
import { getFares } from "../api/user.api"
import PanelButton from "../components/PanelButton"

const UserSearchPanel = ({vehicle, setVehicle, submitButtonHandler}) => {

  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
        <div className="flex flex-col gap-y-3">
            
        </div>

        <div
        className='absolute bottom-10 w-screen flex justify-center'>
          <PanelButton 
          buttonName={(vehicle) ? "Find A Driver" : "Choose Vehicle"}
          disabled={!vehicle}
          onClick={submitButtonHandler} 
          />
        </div>
    
    </>
  )
}

export default UserSearchPanel
