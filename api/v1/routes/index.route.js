const taskRoute= require("./task.route");
const userRoute= require("./user.route");
const middlewareUser= require("../middleware/user.middleware");
module.exports =(app)=>{
   app.use("/tasks",middlewareUser.user,taskRoute);
   app.use("/user",userRoute)
}