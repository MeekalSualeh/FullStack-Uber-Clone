const express = require("express")
const router = express.Router();
const { handleCreatingRide } = require("../controllers/ride.controller")
const { authenticateUser, authorizeUserContainer } = require('../middlewares/authenticationAndAuthorization.middleware')
const { rideRateLimiter } = require("../services/rateLimiter.services")

router.use(rideRateLimiter)

router.post("/create", authenticateUser, authorizeUserContainer(["USER"]), handleCreatingRide)

module.exports = router