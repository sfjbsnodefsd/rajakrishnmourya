const logger  = require('../../logger');
const mongoose = require('mongoose');

const URL = "mongodb://localhost/postdb";
const connectDB =async (URL)=>{
    await mongoose.connect(URL,
     (err, res)=>{
            if(err){
                console.log("Database error.");
               return false;;
            }
            logger.log("Database connected successfully..");
            return true
    })
} 
connectDB(URL);

module.exports = connectDB;