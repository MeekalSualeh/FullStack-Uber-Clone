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

    {rideRequests.map(({ _id, userName, pickup, destination, distance, time, fare }) =>{
      return <RideRequestComponent
      key={_id}
      rideId={_id}
      userName={userName}
      pickup={pickup}
      destination={destination}
      distance={distance}
      time={time}
      fare={fare}
      isAcceptingRide={isAcceptingRide}
      setIsAcceptingRide={setIsAcceptingRide}
      />
    })}
    
    </div>
  )
}

export default RideRequestsPanel