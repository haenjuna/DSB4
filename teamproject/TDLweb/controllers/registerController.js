//@desc get register page
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const jwt = require("jsonwebtoken");

//@route GET /
const getRegister = (req,res) => {
  res.render("register");
};

//@desc Register User
//@route POST /
const registerUser = asyncHandler(async(req,res) => {
  const {name,Email,password} = req.body;
  const hashedPassword = await bcrypt.hash(password,10);
  const user = await User.create({name:name,Email:Email,password:hashedPassword});
  res.status(201).redirect("/");
});

module.exports = {getRegister,registerUser};