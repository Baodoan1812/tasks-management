module.exports.forgotPassword= async (req,res,next)=>{
    if(!req.body.email){
        res.json({
            code:404,
            message:"Vui long nhap email"
        })
        return;
    }
    next();
}