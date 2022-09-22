const express = require('express');
const connection = require('../../db/mysqlDB');
const router = express.Router();

// fetch all employees
router.get("/", async (req,res)=>{
    
    const queries = req.query;

    let query = '';
    if(Object.keys(queries).length){
        let clause = '';
        for(let [key, value] of Object.entries(queries)){
            clause +=  `${key}='${value}' && `;
           
        }
        clause= clause.slice(0,clause.lastIndexOf('&&'));
        
        query = `SELECT * FROM Employee WHERE ${clause} LIMIT 100`; 
    }else{
        query = "SELECT * FROM Employee ORDER BY Name LIMIT 100"; 
    }
        
    await connection.query(query, (err, result)=>{
        if(!err){
           return res.status(200).send({result});

        }
        return res.status(500).send(err);
    });

})

// create a generic table
router.post("/create-table",  async (req,res)=>{

    const {Name, body} = req.body;

    const query = `CREATE TABLE ${Name} (${body.k1.col} ${body.k1.val},${body.k2.col} ${body.k2.val},${body.k3.col} ${body.k3.val})`; 
     await connection.query(query, (err, result)=>{
        if(!err){
            return res.status(201).send({msg: "table created successfully"});
        }
        else{
            console.log(err);
        }
    });
});
// create an employee
router.post("/employee",  async (req,res)=>{

    const {Emp_ID, Name, Company, Salary} = req.body;

    const query = `INSERT INTO Employee (Emp_ID,Name,Company,Salary)  VALUES(?)`; 
    const values = [Emp_ID, Name, Company, Salary];

    await connection.query(query, [values], (err, result)=>{
        console.log(result);
        if(!err){
            return res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});
// add or edit the employee using stored procedure call
router.post("/add-employee",  async (req,res)=>{

    const {Emp_ID, Name, Company, Salary} = req.body;

    const query = `SET @Emp_ID =?;SET @Name =?; SET @Company=?; SET @Salary=?; \ 
     CALL add_edit_employee(@Emp_ID,@Name,@Company,@Salary)
    `; 

    await connection.query(query, [Emp_ID, Name, Company, Salary], (err, result)=>{
        console.log(result);
        if(!err){
            return res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});
// update the employee using stored procedure call
router.put("/update-employee",  async (req,res)=>{

    const {Emp_ID, Name, Company, Salary} = req.body;

    const query = " SET @Emp_ID=?; SET @Name=?; SET @Company=?; SET @Salary=?; CALL add_edit_employee(@Emp_ID,@Name,@Company,@Salary)"; 
   

    await connection.query(query, [Emp_ID, Name, Company, Salary], (err, result)=>{
        
        if(!err){
            return res.status(200).send({result});
        }
        else{
            console.log(err);
        }
    });
});
// update bulk employee using query...continued




// update bulk employee using procedure call...continued

// add employee in BULK using stored procedure call
router.post("/bulk-employee",  async (req,res)=>{

    console.log(req.body)
    let vals = [];
    // for(let body of req.body){
    //     const {Name, Company, Salary} = body;
    //     vals.push([Name,Comapany,Salary]);
    // }
    for(let body of req.body){
        console.log(body);
        const {Emp_ID, Name, Company, Salary} = body;
        const query = `SET @Emp_ID=?; SET @Name =?; SET @Company=?; SET @Salary=?; \ 
         CALL add_edit_employee(@Emp_ID,@Name,@Company,@Salary)
        `; 
       // const values = [Name, Company, Salary];
        await connection.query(query, [Emp_ID, Name, Company, Salary], (err, result)=>{
            if(!err){
                console.log("RESULT: ",result)
                return  res.status(201).send({result});
            }
            else{
                console.log(err);
            }
        });
    }
});
// get an employee
router.get("/employee/:id",  async (req,res)=>{

    const id = req.params.id;

    const query = `SELECT * FROM Employee where Emp_ID = ?`; 

    await connection.query(query, [id], (err, result)=>{
        if(!err){
            console.log(result)
            return res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});
// update the employee
router.put("/employee/:id",  async (req,res)=>{

    const id = req.params.id;
    const {Name} = req.body;

    const query = `Update Employee SET Name = '${Name}' where Emp_ID = ?`; 

    await connection.query(query, [+id], (err, result)=>{
        if(!err){
            console.log(result)
            return res.status(200).send({result});
        }
        else{
            console.log(err);
        }
    });
});
// delete an employee
router.delete("/employee/:id",  async (req,res)=>{

    const id = req.params.id;

    const query = `DELETE Employee where Emp_ID = ?`; 

    await connection.query(query, [id], (err, result)=>{
        if(!err){
            console.log(result)
            return  res.status(201).send({result});
        }
        else{
            console.log(err);
        }
    });
});
// delete the table
router.delete("/delete-employee-table",  async (req,res)=>{

    const query = `DROP Table Employee`; 

    await connection.query(query, (err, result)=>{
        if(!err){
            console.log(result)
            return res.status(200).send({result});
        }
        else{
            console.log(err);
        }
    });
});

module.exports = router;