const express = require("express")
const {authMiddleware } = require("../middleware/authentication")
const {authorMiddleware} = require("../middleware/authorization");
const { createProduct, getProducts, getProductById, deleteProductById , updateProductByIdPatch, searchByName, filterByCategory, productFilter, filterByPrice, pagenation, sorting} = require("../controller/product");
const { addToCart, getCart, updateCartQuantity, removeFromCart, clearCart } = require("../controller/cart");
const { createOrder, getAllOrder } = require("../controller/order");

const router = express.Router();
router.get("/getAllOrder", authMiddleware, authorMiddleware, getAllOrder)
router.post("/createOrder", authMiddleware, authorMiddleware, createOrder)
router.post("/addToCart", authMiddleware,authorMiddleware, addToCart)
router.get("/getCart", authMiddleware, authorMiddleware, getCart)
router.patch("/cart/update", authMiddleware, authorMiddleware, updateCartQuantity)
router.delete("/remove", authMiddleware, authorMiddleware, removeFromCart)
router.delete("/clear", authMiddleware, authorMiddleware, clearCart)
router.get("/search", authMiddleware, authorMiddleware, searchByName)
router.get("/filterByCategory", authMiddleware, authorMiddleware, filterByCategory),
router.get("/proudctFilter", authMiddleware, authorMiddleware, productFilter)
router.get("/filterByPrice", authMiddleware, authorMiddleware,filterByPrice)
router.get("/pagenation", authMiddleware, authorMiddleware, pagenation)
router.get("/sort", authMiddleware, authorMiddleware, sorting)
router.post("/create", authMiddleware, authorMiddleware, createProduct);
router.get("/getAll", authMiddleware, authorMiddleware, getProducts)
router.get("/:id", authMiddleware, authorMiddleware, getProductById)
router.delete("/:id", authMiddleware, authorMiddleware, deleteProductById)
router.patch("/:id", authMiddleware, authorMiddleware, updateProductByIdPatch)
module.exports = router;