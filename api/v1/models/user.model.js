const mongoose = require("mongoose")
const userSchema=new mongoose.Schema(
    {
        fullName: String,
        password: String,
        email:String,
        token:String,
        deleted : {
            type:Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamps:true
    }
)
const User=mongoose.model('User',userSchema,"users")
module.exports=User;