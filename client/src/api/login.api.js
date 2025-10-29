import { api } from "../config/axios.config"

const userLogin = async (credentials) =>{
    try {
        const response = await api.post("/user/login", credentials)
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

const captainLogin = async (credentials) =>{
    try {
        const response = await api.post("/captain/login", credentials)
        return response.data
    
    } catch (error) {
        throw error.response?.data?.error || error.message
    }
}

export {
    userLogin,
    captainLogin
}