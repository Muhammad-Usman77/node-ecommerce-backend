const express = require("express")
const {authMiddleware } = require("../middleware/authentication")
const {authorMiddleware} = require("../middleware/authorization");
const { createProduct, getProducts, getProductById, deleteProductById , updateProductByIdPatch} = require("../controller/product");

const router = express.Router();

router.post("/create", authMiddleware, authorMiddleware, createProduct);
router.get("/getAll", authMiddleware, authorMiddleware, getProducts)
router.get("/:id", authMiddleware, authorMiddleware, getProductById)
router.delete("/:id", authMiddleware, authorMiddleware, deleteProductById)
router.patch("/:id", authMiddleware, authorMiddleware, updateProductByIdPatch)
module.exports = router;