const connection = require('../../db/mysqlDB');

module.exports = {
    create: async (body,callback)=>{
        const {First_Name,Last_Name,Gender, Email, Password, Contact_Number} = body;

        const query = `INSERT INTO User (First_Name,Last_Name,Gender, Email, Password, Contact_Number)  VALUES(?)`; 
        const values = [First_Name,Last_Name,Gender, Email, Password, Contact_Number];

        await connection.query(query, values, (err, result)=>{
            console.log(result);
            if(!err){
                return callback(result);
            }
            else{
               return callback(err);
            }
        });
       
    },

    createTable: async (data, callback)=>{
     console.log("in service: ", data)
        const {Name, body} = data;

        const query = `CREATE TABLE ${Name} (${body.k1.col} ${body.k1.val},${body.k2.col} ${body.k2.val},${body.k3.col} ${body.k3.val}, ${body.k4.col} ${body.k4.val}, ${body.k5.col} ${body.k5.val},${body.k6.col} ${body.k6.val})`; 
        
        await connection.query(query, (err, result)=>{
            if(!err){
                return callback(result)
            }
            else{
                return callback(err);
            }
        });
    }
}