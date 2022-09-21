//const http  = require('http');
const express = require('express');
const cors = require('cors');
const debug = require('debug');
const db = require("./experiment/db/connect");
const connection = require("./db/mysqlDB");
const app = express();
const PORT = process.env.PORT | 3000;
const employeeRouter = require('./Routes/Employee/Employee');

// addd cors policy
app.use(cors());

// json middleware
app.use(express.json());

app.get('/api/', (req,res)=>{
    res.status(200).send({msg: " in home route"})
})

app.use("/employees", employeeRouter);


app.listen(PORT, (req,res)=>{
     console.log(`server connected on port ${PORT}`);
});



// const fn = (req,res)=>{
//     res.writeHead(200, {"Content-Type": "application/json"});
//     res.write("Hello World. my new world");
//     res.end();
//  };
// http.createServer(fn).listen(3000);
