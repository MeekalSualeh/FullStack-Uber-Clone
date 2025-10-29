import { api } from "../config/axios.config"

const userLogout = async () =>{
    try {
        const response = await api.get("/user/logout")
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

const captainLogout = async () =>{
    try {
        const response = await api.get("/captain/logout")
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

export {
    userLogout,
    captainLogout
}