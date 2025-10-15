const express = require("express")
const router = express.Router()
const {
    handleUserLogin,
    handleUserSignup,
    handleUserLogout
} = require("../controllers/user.controllers")
const { loginSignupCheck, authenticateUser, authorizeUserContainer } = require('../middlewares/authenticationAndAuthorization.middleware')
const { userRateLimiter } = require("../services/rateLimiter.services")

router.use(userRateLimiter)

router.post("/login", loginSignupCheck, handleUserLogin)

router.post("/signup", loginSignupCheck, handleUserSignup)

router.get("/logout", authenticateUser, authorizeUserContainer(["USER"]), handleUserLogout)

module.exports = router;