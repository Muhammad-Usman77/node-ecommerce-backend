const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { dbconnection } = require("./connection");
const app = express();
const { authMiddleware } = require("./middleware/authentication");
const { authorMiddleware } = require("./middleware/authorization");
const userRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const addressRoutes = require("./routes/addressRoutes")
const paymentRoutes = require("./routes/paymentRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
dbconnection(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/check", (req, res) => {
  return res.end(`checking for ecommerce backend flow `);
});
app.get("/profile", authMiddleware, (req, res) => {
  return res.json({ msg: `welcome to profile` });
});

app.get("/admin", authMiddleware, authorMiddleware, (req, res) => {
  return res.json({ msg: `welcome admin` });
});
app.use("/", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)
app.use("/review", reviewRoutes)
app.use("/wishlist", wishlistRoutes)
app.use("/address", addressRoutes)
app.use("/payment", paymentRoutes);
app.listen(process.env.PORT, (req, res) => {
  console.log(`server connected`);
});
