const mongoose = require('mongoose')

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then((conn) => {
            console.log(`MongoDB Connected with Server: ${conn.connection.host}`)
        })
        .catch((error) => {
            console.log(error)
            process.exit(1)
        })
}

module.exports = dbConnect