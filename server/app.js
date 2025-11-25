const dotenv = require("dotenv");
dotenv.config()

const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")

const userRoute = require("./src/routes/user.routes");
const captainRoute = require("./src/routes/captain.routes");
const mapRoute = require("./src/routes/map.routes");
const rideRoute = require("./src/routes/ride.routes")
const authRoute = require("./src/routes/authorization.routes")

const { connectToMongo } = require("./src/config/db.config")
connectToMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "https://full-stack-uber-clone-mu.vercel.app/",
    credentials: true
}))

app.use("/user", userRoute);
app.use("/captain", captainRoute);
app.use("/map", mapRoute);
app.use("/ride", rideRoute);
app.use("/auth", authRoute);

module.exports = app

// error
// success
// redirect

