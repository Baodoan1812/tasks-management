const express= require("express");
const router = express.Router();
const controller= require("../controller/user.controller.js");
const validateRegister= require("../../../validate/register.validate.js");
const validateLogin= require("../../../validate/login.validate.js");
const validateForgotPassword= require("../../../validate/forgot-password.validate.js");
const middlewareUser= require("../middleware/user.middleware.js");
router.post("/register",validateRegister.register,controller.register);
router.post("/login",validateLogin.login,controller.login)
router.post("/forgot-password",validateForgotPassword.forgotPassword,controller.forgotPassword);
router.post("/otp",controller.otp)
router.post("/reset",controller.reset)
router.get("/info",middlewareUser.user,controller.info)
module.exports = router;