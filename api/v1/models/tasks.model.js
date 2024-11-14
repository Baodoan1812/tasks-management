const mongoose = require("mongoose")
const tasksSchema=new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        create_user_id:String,
        participants:Array,
        task_parent_id:String,
        timeStart: Date,
        timeFinish: Date,
        createdAt: Date,
        updatedAt: Date,
        deleted : {
            type:Boolean,
            default: false
        },
    },
    {
        timestamps:true
    }
)
const Task =mongoose.model('Task',tasksSchema,"tasks")
module.exports= Task;