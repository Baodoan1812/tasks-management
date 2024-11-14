const md5= require("md5")
const User=require("../models/user.model")
const ForgotPassword= require("../models/password-forgot.model");
const generateHelper= require("../../../helper/generate");
const sendEmailHelper= require("../../../helper/sendOtpEmail");
module.exports.register= async (req,res)=>{
    const existEmail= await User.findOne({email:req.body.email,deleted:false});
    if(existEmail){
        res.json({
            code:"404",
            message:"email da ton tai"
        })
        return;
    }
    const objectUSer={
        fullName:req.body.fullName,
        email:req.body.email,
        password:md5(req.body.password),
        token:generateHelper.generateRandomString(30)
    }
    const user= new User(objectUSer);
    await user.save();
    const token= user.token;
    res.cookie("token",token)
    res.json({
        code: 200,
        message:"Tao tai khoan thanh cong",
        token:token
})
}
module.exports.login= async (req,res)=>{
    const user= await User.findOne({
        email:req.body.email,
        password:md5(req.body.password)
    })
    if(user){
        res.cookie("token",user.token)
        res.json({
            code:200,
            message:"Dang nhap thanh cong",
            token:user.token
        })
    }
    else{
        res.json({
            code:404,
            message:"Tai khoan va mat khau khong dung",
            
        })
    }
    
}
module.exports.forgotPassword= async(req,res)=>{
    const email= req.body.email;
    const existEmail= await User.findOne({
        email:req.body.email,
        deleted:false
    })
    if(!existEmail){
        res.json({
            code:404,
            message:"Khong ton tai email"

        })
        return;
    }
    const timeExpires= 5;
    const objectForgot= {
        email:req.body.email,
        otp:generateHelper.generateRandomNumber(8),
        expireAt: Date.now() + timeExpires*60*1000 
    }
    const forgotpassword= new ForgotPassword(objectForgot);
    await forgotpassword.save();
    const subject="Ma OTP de cap nhat lai mat khau";
    const html=`ma otp la <b>${objectForgot.otp} (co thoi han ${timeExpires} phut)`; 
    sendEmailHelper.sendOtp(email,subject,html);
    res.json({
        code:200,
        message:"Gui OTP thanh cong"
    })
}
module.exports.otp=async (req,res)=>{
    const email= req.body.email;
    const otp= req.body.otp;
    const result= await ForgotPassword.findOne({email:email});
    if(!result){
        res.json({
            code:404,
            message:"Tai khoan khong ton tai"
        })
        return;
    }
    if(otp!=result.otp){
        res.json({
            code:404,
            message:"Ma OTP khong dung"
        })
        return;
    }
    const user = await User.findOne({email:email})
    res.cookie("token",user.token)
    res.json({
        code:200,
        message:"Nhap OTP thanh cong"
    })
}
module.exports.reset= async (req,res)=>{
    const token = req.cookies.token;
    const user= await User.findOne({token:token,deleted:false});
    if(!user){
        res.json({
            code:404,
            message:"tai khoan khong ton tai"
        })
        return;
    }
    if(user.password== md5(req.body.password)){
        res.json({
            code:404,
            message:"Mat khau trung mat khau cu"
        })
        return;
    }
    if(req.body.password!=req.body.confirmPassword){
        res.json({
            code:404,
            message:"Mat khau xac nhan khong dung voi mat khau moi"
        })
        return;
    }
    await User.updateOne({token:token},{
        password:md5(req.body.password)
    })
    res.json({
        code:200,
        message:"Doi mat khau thanh cong"
    })
}
module.exports.info= async (req,res)=>{
    res.json({
        code:200,
        message:"Hien thi thong tin thanh cong",
        info:req.user
    })
}