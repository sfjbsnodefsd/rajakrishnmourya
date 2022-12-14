const logger  = require('../../logger');
const mongoose = require('mongoose');
require('dotenv').config();
const URL = "process.env.MONGO_DB_CONNECTION_URL"; // | "mongodb://localhost/postdb";
const connectDB =async (URL)=>{
    await mongoose.connect(URL,
     (err, res)=>{
            if(err){
                console.log("Database error.");
               return false;;
            }
            logger.log("Mongodb Database connected successfully..");
            return true
    })
} 
connectDB(URL);

module.exports = connectDB;