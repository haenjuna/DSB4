const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JW_SECRET


const getAllTodo = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.token,jwtSecret)
  const userTodos = await Todo.find({ Email: decoded.Email});
  res.render("todo", { todo: userTodos });
});


const createTodo = asyncHandler(async(req,res)=>{
  const { title, body } = req.body;
  const decoded = jwt.verify(req.cookies.token,jwtSecret)
  const check = false;
  if(!title||!body){
    return res.status(400).send("필수값입력안함")
  }
  const contact = await Todo.create({Email:decoded.Email,title:title,body:body,check:check});
  res.status(201).redirect("/todo");
});

const updateTodo = asyncHandler(async(req,res)=>{
  const id= req.params.id;
  const {title, body} = req.body;
  const check = req.body.check === 'on';
  const toDo = await Todo.findByIdAndUpdate(id,{
    check,
    title,
    body,
  });
  res.status(200).redirect("/todo");
});

const deleteTodo = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const toDo = await Todo.findByIdAndDelete(id);
  res.status(200).redirect("/todo");
});

const getName = asyncHandler(async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, jwtSecret);
    const userName = decoded.name;
    res.status(200).send(`Welcome, ${userName}!`);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

module.exports = {getAllTodo,createTodo,updateTodo,deleteTodo,getName};