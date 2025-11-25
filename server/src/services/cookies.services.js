module.exports.setCookie = (res, cookieName, token, expiryTime) =>{
    const options = {
        httpOnly: true,
        sameSite: "none",
        maxAge: expiryTime
    }
    res.cookie(cookieName, token, options)
    
}
// secure: true,

module.exports.removeCookie = (res, cookieName) =>{
    const options = {
        httpOnly: true,
        sameSite: "none",
    }
    res.clearCookie(cookieName, options)
}
// domain: "fullstack-uber-clone-production.up.railway.app",