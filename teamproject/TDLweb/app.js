const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const errorHandler = require("./middlewares/errorHandler");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");
const checkLogin = require("./middlewares/checkLogin.js");
const app = express();

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static("./public"))
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "your_secret_key", resave: true, saveUninitialized: true }));


const PORT = 3000;
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/login",require("./routes/loginRoutes"));
app.use("/register",require("./routes/registerRoutes"));
app.use("/todo", require("./routes/todoRoutes"));

app.listen(PORT, () => {
  console.log(`Server listening from http://localhost:${PORT}`);
});
