import { api } from "../config/axios.config"

const getSuggestions = async (input) =>{
    try {
        const response = await api.get("/map/get-suggestions", {
            params:{
                input
            }
        })
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

const getCoordinates = async (address) =>{
    try {
        const response = await api.get("/map/get-coordinates", {
            params:{
                address
            }
        })
        return [response.data.lng, response.data.lat]
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

const getDistanceTime = async (origins, destinations) =>{
    try {
        const response = await api.get("/map/get-distance-time", {
            params:{
                origins,
                destinations
            }
        })
        return {
            distance: response.data.distance.value,
            time: response.data.duration.value
        }
        
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

const getFares = async (distance, time) =>{
    try {
        const response = await api.get("/map/get-fares", {
            params:{
                distance,
                time
            }
        })
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

const getDistanceTimeFareAndCoordinates = async (origins, destinations) =>{
    try {
        const distanceAndTimeResponse = await getDistanceTime(origins, destinations)
        const { distance, time } = distanceAndTimeResponse

        const fareResponse = await getFares(distance, time)
        
        const pickupCoordinates = await getCoordinates(origins)
        const destinationCoordinates = await getCoordinates(destinations)

        return {
            distance, 
            time, 
            fares: fareResponse,
            pickupCoordinates,
            destinationCoordinates
        }

    } catch (error) {
        throw error.response?.data?.error || error.message
    }
    
}



export {
    getSuggestions,
    getCoordinates,
    getFares,
    getDistanceTime,
    getDistanceTimeFareAndCoordinates
}