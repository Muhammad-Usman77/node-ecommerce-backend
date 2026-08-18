const express = require("express")
const {authMiddleware } = require("../middleware/authentication")
const {authorMiddleware} = require("../middleware/authorization");
const { addToCart, getCart, updateCartQuantity, removeFromCart, clearCart } = require("../controller/cart");

const router = express.Router()


router.post("/addToCart", authMiddleware,authorMiddleware, addToCart)
router.get("/getCart", authMiddleware, authorMiddleware, getCart)
router.patch("/cart/update", authMiddleware, authorMiddleware, updateCartQuantity)
router.delete("/remove", authMiddleware, authorMiddleware, removeFromCart)
router.delete("/clear", authMiddleware, authorMiddleware, clearCart)

module.exports = router;