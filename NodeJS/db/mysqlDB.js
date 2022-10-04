const mysql = require('mysql');
const env = require('dotenv').config();
console.log(env);
const connection = mysql.createConnection({
   host: env.parsed.host,
   user:  env.parsed.user,
   password: env.parsed.password,
   database: env.parsed.database,
   multipleStatements: env.parsed.multipleStatements
});
//const connection = mysql.createConnection("MYSQL_CONNECTION_URL");

connection.connect((err,res)=>{
 if(err){
    console.log(err)
    return;
 }
 console.log("Mysql Database connected successfully: ",res);

})

module.exports = connection;