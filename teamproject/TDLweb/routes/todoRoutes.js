const express = require("express");
const {getAllTodo,createTodo,updateTodo,deleteTodo,getName} = require("../controllers/todoController");
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
router.use(cookieParser());

router
  .route("/")
  .get(checkLogin, getAllTodo)
  .post(checkLogin, createTodo)
router.route("/:id").put(checkLogin,updateTodo).delete(checkLogin, deleteTodo)

router.get("/getUserName", checkLogin, getName);
module.exports = router;