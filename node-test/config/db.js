const mongoose = require('mongoose')

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection Successful')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connection