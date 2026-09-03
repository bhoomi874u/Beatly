const adminOnly=(req,res,next)=>{
    if(req.role!=="admin"){
        return res.status(403).json({message:"Access Denied  Admin Only"});

    }
    next();
}
module.exports=adminOnly;