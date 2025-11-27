module.exports.setCookie = (res, cookieName, token, expiryTime) =>{
    const options = {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: expiryTime
    }
    res.cookie(cookieName, token, options)
    
}

module.exports.removeCookie = (res, cookieName) =>{
    const options = {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    }
    res.clearCookie(cookieName, options)
}

// domain: "fullstack-uber-clone-production.up.railway.app",