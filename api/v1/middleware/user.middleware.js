const User= require("../models/user.model");
module.exports.user= async (req,res,next)=>{
    if(req.headers.authorization){
        const token= req.headers.authorization.split(" ")[1];
        const user= await User.findOne({token:token,deleted:false}).select("fullName email"); 
        if(!user){
            res.json({
                code:404,
                message:"Token khong hop le"
            })
            return;
        }
        else{
            req.user= user;
            next();
        }
    }
    else {
        res.json({
            code:404,
            message:"Ban chua co quyen. Ban can dang nhap tai khoan"
        })
        return;
    }
    
}