const auth = (req, res , next)=>{
    console.log("in auth")
    //req.user = "pankaj"
    if(req.user == "rajamaurya"){
        next();
    }else{
        return res.status(401).send({mesg: "unauthorized user"})
    }

}
module.exports = auth;