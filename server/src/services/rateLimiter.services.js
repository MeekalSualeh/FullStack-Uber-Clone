const rateLimit = require("express-rate-limit")

const mapRateLimiter = rateLimit({
    windowMs: 60000,
    max: 50,
    message: { error: "Too many map requests, Slow down" }
})

const userRateLimiter = rateLimit({
    windowMs: 60000,
    max: 5,
    message: { error: "Too many request, Slow Down" }
})

const captainRateLimiter = rateLimit({
    windowMs: 60000,
    max: 5,
    message: { error: "Too many request, Slow Down" }
})

const rideRateLimiter = rateLimit({
    windowMs: 60000,
    max: 3,
    message: { error: "Too many Ride creation requests, Slow down" }
})

module.exports = {
    mapRateLimiter,
    userRateLimiter,
    captainRateLimiter,
    rideRateLimiter
}