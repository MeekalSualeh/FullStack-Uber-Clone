module.exports.setCookie = (res, cookieName, token, expiryTime) =>{
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: expiryTime
    }
    res.cookie(cookieName, token, options)

}

module.exports.removeCookie = (res, cookieName) =>{
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }
    res.clearCookie(cookieName, options)
}