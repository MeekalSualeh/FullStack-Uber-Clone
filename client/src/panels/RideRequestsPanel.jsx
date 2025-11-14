import { useState } from "react"
import RideRequestComponent from "../components/RideRequestComponent"

const RideRequestsPanel = ({
    rideRequests,
}) => {

    const [isAcceptingRide, setIsAcceptingRide] = useState(false)

  return (
    <div
    className="flex flex-col flex-shrink-0 mx-3 h-[85%] overflow-y-scroll mt-7 gap-y-5"
    >

    <RideRequestComponent
    user={`Meekal`}
    pickup={`Maalik Welfare Organization`}
    destination={`UBIT - University Of Karachi`}
    distance={2500}
    time={1500}
    fare={220}
    isAcceptingRide={isAcceptingRide}
    setIsAcceptingRide={setIsAcceptingRide}
    />
    
    </div>
  )
}

export default RideRequestsPanel