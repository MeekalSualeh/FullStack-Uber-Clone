import { api } from "../config/axios.config"

const createRide = async (data) =>{
    try {
        const response = await api.post("/user/login", data)
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

export {
    createRide,
}