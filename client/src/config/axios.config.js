import axios from "axios"

export const api = axios.create({
    // baseURL: import.meta.env.VITE_BACKEND_URL,
    baseURL: "https://fullstack-uber-clone.onrender.com",
    withCredentials: true,  
})