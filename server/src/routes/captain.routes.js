const express = require("express")
const router = express.Router()
const {
    handleCaptainLogin,
    handleCaptainSignup,
    handleCaptainLogout
} = require("../controllers/captain.controllers")
const { loginSignupCheck, authenticateUser, authorizeUserContainer } = require('../middlewares/authenticationAndAuthorization.middleware')
const { captainRateLimiter } = require("../services/rateLimiter.services")

router.use(captainRateLimiter)

router.post("/login", loginSignupCheck, handleCaptainLogin)

router.post("/signup", loginSignupCheck, handleCaptainSignup)

router.get("/logout", authenticateUser, authorizeUserContainer(["CAPTAIN"]), handleCaptainLogout)

module.exports = router;