module.exports.login= async (req,res,next)=>{
    if(!req.body.email){
        res.json({
            code:404,
            message:"Vui long nhap email"
        })
        return;
    }
    if(!req.body.password){
        res.json({
            code:404,
            message:"Vui long nhap mat khau"
        })
        return;
    }
    next();
}