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
        return response.data
    
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
        return response.data
        
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
    }s
}

export {
    getSuggestions,
    getCoordinates,
    getFares,
    getDistanceTime
}