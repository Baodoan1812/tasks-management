const express= require("express");
const router = express.Router();
const controller= require("../controller/task.controller.js");
router.get("/",controller.index);
router.get("/detail/:id",controller.detail)
router.patch("/change-status/:id",controller.editPatch)
module.exports = router;