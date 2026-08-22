const express = require("express");
const helmet = require("helmet")
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
const cookieParser = require("cookie-parser");
const { dbconnection } = require("./connection");
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
const { authMiddleware } = require("./middleware/authentication");
const { authorMiddleware } = require("./middleware/authorization");
const errorMiddleware = require("./middleware/errorMiddleware")
const notfoundMiddleware = require("./middleware/notfoundMiddleware");

const userRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const addressRoutes = require("./routes/addressRoutes")
const paymentRoutes = require("./routes/paymentRoutes");

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(limiter);

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
app.use("/payment", paymentRoutes)
// 404 handler
app.use(notfoundMiddleware)
app.use(errorMiddleware)
app.listen(process.env.PORT, (req, res) => {
  console.log(`server connected`);
});


/*

security:

Helmet        → Security headers
CORS          → Control frontend origins
Rate Limit    → Too many requests block
Joi           → Invalid input control
bcrypt        → Password protection
httpOnly      → Cookie security
.env          → Secrets protection
*/