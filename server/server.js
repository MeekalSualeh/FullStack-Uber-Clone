const app = require("./app");
const { createServer } = require("http")
const { socketSetup } = require("./src/socket/index.socket")

const server = createServer(app);

socketSetup(server);

server.listen(process.env.PORT || 3000,  () =>{
    console.log(`server is running on port: http://localhost:${process.env.PORT || 3000}`)
})

// transactions m await lagana

// EVENTS -------------- 12
// connection   
// disconnect       - All
// update-location  - Captain
// accept-ride      - Captain
// remove-ride      - Captain
// cancelled-by-captain - Captain
// ride-started     - Captain
// ride-completed   - Captain
// cancelled-by-user    - User
// join-chatroom    - All
// give-chats       - All
// message-from-frontend    - All

// socket.userId
// socket.rideId
// socket.anotherPersonId

//checking github connection