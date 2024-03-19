const express = require("express");
const {getLogin, loginUser} = require("../controllers/loginController")
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
router.use(cookieParser());

router.route("/").get(getLogin).post(loginUser);
// router.route("/logout").get(logout);

module.exports = router;