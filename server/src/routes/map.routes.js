const express = require("express")
const router = express.Router();
const { query } = require("express-validator")
const {
    handleGettingCoordinates,
    handleGettingDistanceTime,
    handleGettingSuggestions,
    handleGettingFares
} = require("../controllers/map.controllers")

const { authenticateUser, authorizeUserContainer } = require('../middlewares/authenticationAndAuthorization.middleware')
const { mapRateLimiter } = require("../services/rateLimiter.services")

router.use(mapRateLimiter)

router.get("/get-suggestions", authenticateUser, authorizeUserContainer(["USER"]), query("input").isString().isLength({ min:3 }).withMessage("suggestion field must be atleast 3 characters long"), 
handleGettingSuggestions)

router.get("/get-coordinates",
    authenticateUser,
    authorizeUserContainer(["USER"]),
    query("address").isString().isLength({ min:3 }).withMessage("location must be atleast 3 characters long"), 
    handleGettingCoordinates)

router.get("/get-distance-time",
    authenticateUser,
    authorizeUserContainer(["USER"]),
    [
        query("origins").isString().isLength({ min:3 }).withMessage("pickup must be atleast 3 characters long"),
        query("destinations").isString().isLength({ min:3 }).withMessage("destination must be atleast 3 characters long"),
    ],
    handleGettingDistanceTime)

router.get("/get-fares", 
    authenticateUser,
    authorizeUserContainer(["USER"]),
    [
        query("distance").isNumeric().withMessage("Distance can only be integer"),
        query("time").isNumeric().withMessage("Time can only be integer")
    ], 
    handleGettingFares)

module.exports = router