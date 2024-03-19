const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JW_SECRET;


//@desc get login page
//@route GET /
const getLogin = (req, res) => {
  res.render("login");
};

//@desc Login User
//@route POST /
const loginUser = asyncHandler (async(req,res)=> {
  // console.log("req바디임",req.body);
  const {Email,password} = req.body;

  const user = await User.findOne({Email})
  console.log(user);
  if(!user){
    return res.status(401).send("일치하는 사용자가 없습니다.");
  }
  const isMatch = await bcrypt.compare(password,user.password);
  // console.log(password,user.password );
  // console.log(`isMatch = ${isMatch}`);
  if(!isMatch){
    return res.status(401).send("비밀번호가 일치하지 않습니다.")
  }
  const token = jwt.sign({Email:user.Email, name:user.name},jwtSecret);
  res.cookie("token",token,{httpOnly:true});
  res.redirect("/todo");
});

module.exports = {getLogin, loginUser};