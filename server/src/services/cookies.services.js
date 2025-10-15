module.exports.setCookie = (res, cookieName, token, expiryTime) =>{
    const options = {
        httpOnly: true,
        maxAge: expiryTime
    }
    res.cookie(cookieName, token, options)

}

module.exports.removeCookie = (res, cookieName) =>{
    const options = {
        httpOnly: true
    }
    res.clearCookie(cookieName, options)
}