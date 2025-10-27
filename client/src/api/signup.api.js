import { api } from "../config/axios.config"

const userSignup = async (credentials) =>{
    try {
        const response = await api.post("/user/signup", credentials)
        return response.data

    } catch (error) {
        throw error.response?.data || error.message
    }
}

const captainSignup = async (credentials) =>{
    try {
        const response = await api.post("/captain/signup", credentials)
        return response.data

    } catch (error) {
        throw error.response?.data || error.message
    }
}

export {
    userSignup,
    captainSignup
}