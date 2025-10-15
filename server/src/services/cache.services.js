const NodeCache = require("node-cache")
const cache = new NodeCache({ checkPeriod: 60 })

module.exports = cache

// in node-cache ----------
// user:${userId}
// ride:${rideId}
// suggestions:${input}
// coordinates:${address}
// timeAndDistance:${origins},${destinations} (time, distance)
// fares:${time},${distance}
// otp:${rideId}

// Map() --------
// userIdToSocketId