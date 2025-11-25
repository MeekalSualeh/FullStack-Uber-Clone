module.exports.setCookie = (res, cookieName, token, expiryTime) =>{
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "fullstack-uber-clone-production.up.railway.app",
        maxAge: expiryTime
    }
    res.cookie(cookieName, token, options)

}

module.exports.removeCookie = (res, cookieName) =>{
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "fullstack-uber-clone-production.up.railway.app",
    }
    res.clearCookie(cookieName, options)
}