const http  = require('http');

const fn = (req,res)=>{
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write("Hello World. my new world");
    res.end();
 };
http.createServer(fn).listen(3000);
