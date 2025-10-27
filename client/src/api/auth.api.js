import { api } from "../config/axios.config"

export const fetchAuthData = async () =>{
    try {
        const response = await api.get("/auth")
        return {role: response.data}

    } catch (error) {

        if(error.response.status === 401){
            return { redirect: true }
        }

        console.log(error)
        return new Error(`Server Error: ${error}`)
    }
}
