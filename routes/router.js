const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController.js")
const checkUserAuth = require("../middlewares/auth-middleware.js")

router.get("/task-list", checkUserAuth, TaskController.taskList);
router.post("/addtask", checkUserAuth, TaskController.addTask);
router.put("/updatetask/:id", checkUserAuth, TaskController.updateTask);
router.delete("/deletetask/:id", checkUserAuth, TaskController.deleteTask);
router.post("/search/:key", checkUserAuth, TaskController.searchTask);

//user
router.post("/user/registry", TaskController.registry);
router.post("/user/login", TaskController.userLogin);


module.exports = router