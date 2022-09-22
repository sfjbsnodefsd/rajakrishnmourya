const mysql = require('mysql');

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password:"welcome$1234",
   database:"employeeDB",
   multipleStatements:true
});

connection.connect((err,res)=>{
 if(err){
    console.log(err)
    return;
 }
 console.log("Mysql Database connected successfully: ",res);

})

module.exports = connection;