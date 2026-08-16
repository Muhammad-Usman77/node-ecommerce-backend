const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { dbconnection } = require("./connection");
const app = express();
const {authMiddleware} = require("./middleware/authentication")
const {authorMiddleware} = require("./middleware/authorization")
const userRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(express.urlencoded({express:false}))
app.use(cookieParser())
dbconnection(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/check", (req, res) => {
  return res.end(`checking for ecommerce backend flow `);
});
app.get("/profile", authMiddleware, (req, res)=>{
  return res.json({msg:`we are on profile`})
})

app.get("/admin", authMiddleware,authorMiddleware ,(req, res)=>{
  return res.json({msg:`access denied`})
})
app.use("/", userRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server connected`);
});
