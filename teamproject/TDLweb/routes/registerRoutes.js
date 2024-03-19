const express = require("express");
const {getRegister,registerUser} = require("../controllers/registerController");
const router = express.Router();

router.route("/").get(getRegister).post(registerUser);

module.exports = router;