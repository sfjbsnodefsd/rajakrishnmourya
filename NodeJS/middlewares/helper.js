const helper = (req,res, next)=>{
    res.setHeader("Content-Type","application/json");
    req.user = "rajamaurya";
    console.log("-----" + req.url + "----------")
    next();
}
module.exports = helper;