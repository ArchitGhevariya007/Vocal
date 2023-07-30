const mongoose = require("mongoose");

//Connection string
const CONN_MONGODB_URI="mongodb://localhost:27017/vocal"

const dbConnection = async () => {
    try {
        const connect=await mongoose.connect(CONN_MONGODB_URI);
    } catch (err) {
        console.log("DB connection error:", err);
    }
};

module.exports = dbConnection;
