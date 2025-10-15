const axios = require("axios")

const userLogin = (credentials) =>{
    const BASE_URL = import.meta.env.VITE_BACKEND_URL

    let data = axios.post(`${BASE_URL}/user/login`,credentials, {
        withCredentials:true
    })

    
}

const userSignup = (credentials) =>{

}

module.exports = {
    userLogin,
    userSignup
}