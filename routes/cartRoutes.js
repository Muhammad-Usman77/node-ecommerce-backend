const express = require("express")
const {authMiddleware } = require("../middleware/authentication")
const {authorMiddleware} = require("../middleware/authorization");
const { addToCart, getCart, updateCartQuantity, removeFromCart, clearCart } = require("../controller/cart");

const router = express.Router()


router.post("/addToCart", authMiddleware, addToCart)
router.get("/getCart", authMiddleware,  getCart)
router.patch("/cart/update", authMiddleware,  updateCartQuantity)
router.delete("/remove", authMiddleware,  removeFromCart)
router.delete("/clear", authMiddleware,  clearCart)

module.exports = router;