const mongoose = require("mongoose")

module.exports.connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((e) =>{
        console.log(`connected to MongoDB Atlas: ${e.connection.host}:${e.connection.port}/${e.connection.name}`)
    })
    .catch((err) =>{
        console.log(err)
    })
}