const {hashSync, genSaltSync} = require('bcrypt');
const { create, createTable } = require('../Users/user.service');


module.exports = {
    creatUser: (req,res)=>{
       const body = req.body;
       const salt = genSaltSync(10)
       body.password = hashSync(body.password, salt);
       create(body, (err,result)=>{
        if(err){
            return res.status(500).json({
                success: 0,
                message: "internal server error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: "created user successfully"
        })
       })
    },
    creatUserTable: (req,res)=>{
        
        const body = req.body;
        
        createTable(body, (err,result)=>{
         if(err){
             return res.status(500).json({
                 success: 0,
                 message: "internal server error"
             })
         }
         return res.status(201).json({
             success: 1,
             message: "created user table successfully"
         })
        })
     }
}