const jwt = require("jsonwebtoken")

module.exports.makeJWTKey = (_id, role, expiryTime) =>{
    return jwt.sign({
        _id,
        role
    }, process.env.JWT_SECRET, {expiresIn: expiryTime})
}

module.exports.verifyJWTKey = (token) =>{
    let data;
    try {
        data = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        data = ""
    }
    return data
}

// jwt.decode