const express = require('express');
const connection = require('../../db/mysqlDB');
const router = express.Router();

router.get("/", async (req,res)=>{

    const query = "SELECT * FROM Employee"; 
    await connection.query(query, (err, result)=>{
        if(!err){
           res.status(200).send({result});
        }
        res.status(500).send(err);
    });

})
router.get("/create-table",  async (req,res)=>{
    console.log("in post api", req.body)
    const query = "CREATE TABLE Employee (Emp_ID INT AUTO_INCREMENT PRIMARY KEY, Name varchar(30), Company varchar(40), Salary varchar(30))"; 
     await connection.query(query, (err, result)=>{
        if(!err){
            res.status(201).send({msg: "table created successfully"});
        }
        else{
            console.log(err);
        }
    });
});
router.post("/employee",  async (req,res)=>{

    const {Emp_ID, Name, Company, Salary} = req.body;

    const query = `INSERT INTO Employee (Emp_ID,Name,Company,Salary)  VALUES(?)`; 
    const values = [Emp_ID, Name, Company, Salary];

    await connection.query(query, [values], (err, result)=>{
        console.log(result);
        if(!err){
            res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});
router.get("/employee/:id",  async (req,res)=>{

    const id = req.params.id;

    const query = `SELECT * FROM Employee where Emp_ID = ?`; 

    await connection.query(query, [id], (err, result)=>{
        if(!err){
            console.log(result)
            res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});
router.delete("/employee/:id",  async (req,res)=>{

    const id = req.params.id;

    const query = `DELETE Employee where Emp_ID = ?`; 

    await connection.query(query, [id], (err, result)=>{
        if(!err){
            console.log(result)
            res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});

module.exports = router;