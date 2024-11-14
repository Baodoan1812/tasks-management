module.exports.register= async (req,res,next)=>{
    if(!req.body.fullName){
        res.json({
            code:404,
            message:"Vui long nhap ten"
        })
        return;
    }
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