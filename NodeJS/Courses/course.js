const express = require('express');

const course_router = express.Router();

course_router.get("/",(req,res)=>{
    res.status(200).send({"msg": "course_list"});
})

module.exports = course_router;