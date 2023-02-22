const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();

const dbConnected = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL)
        console.log(`db connected: ${connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = dbConnected