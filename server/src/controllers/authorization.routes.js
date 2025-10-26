const authorizeUserOrCaptain = (req, res) =>{
    return res.status(200).json(req.role.toLowerCase())
}

module.exports = {
    authorizeUserOrCaptain
}