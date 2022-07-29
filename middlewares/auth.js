const login = (req,res,next)=>{
    if(req.session?.nombre){
        next();
    }else{
        res.status(401).send("not authorized");
    }
}
module.exports = {
    login
}