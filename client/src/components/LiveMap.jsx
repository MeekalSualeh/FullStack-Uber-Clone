import { useState, useEffect } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

const mapContainerStyle = {
    width: "100%",
    height: "100%"
}

const options = {
    disableDefaultUI: true,
    clickableIcons: false,
}

const LiveMap = ({
    pickupCoordinates,
    destinationCoordinates,
    captainLocation,
    showPickup=false,
    showDestination=false,
    showCaptain=false,
    width="w-screen",
    height="h-full",
}) => {

    const [center, setCenter] = useState(captainLocation)


    const iconWithoutURL = {
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40)
    }

    useEffect(() =>{
        if(captainLocation){

            setCenter(captainLocation)
        } 

    }, [captainLocation.lat, captainLocation.lng])

  return (

    <div className={`${width} ${height}`}>

        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={options}
        >

        {showPickup && (
            <Marker 
            position={pickupCoordinates}
            icon={{
                ...iconWithoutURL,
                url: "/user-location-fill.svg"
            }}
            />
        )}

        {showDestination && (
            <Marker 
                position={destinationCoordinates}
                icon={{
                ...iconWithoutURL,
                url: "/map-pin-2-fill.svg"
            }}
            />
        )}

        {showCaptain && (
            <Marker 
                position={captainLocation}
                icon={{
                ...iconWithoutURL,
                url: "/taxi-fill.svg"
            }}
            />
        )}

        </GoogleMap>        

    </div>

  )
}

export default LiveMap
