const express = require("express");
const { authMiddleware } = require("../middleware/authentication");
const { authorMiddleware } = require("../middleware/authorization");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductByIdPatch,
  searchByName,
  filterByCategory,
  productFilter,
  filterByPrice,
  pagenation,
  sorting,
} = require("../controller/product");

const router = express.Router();

router.get("/search", authMiddleware, authorMiddleware, searchByName);
(router.get(
  "/filterByCategory",
  authMiddleware,
  authorMiddleware,
  filterByCategory,
),
  router.get(
    "/proudctFilter",
    authMiddleware,
    authorMiddleware,
    productFilter,
  ));
router.get("/filterByPrice", authMiddleware, authorMiddleware, filterByPrice);
router.get("/pagenation", authMiddleware, authorMiddleware, pagenation);
router.get("/sort", authMiddleware, authorMiddleware, sorting);
router.post("/create", authMiddleware, authorMiddleware, createProduct);
router.get("/getAll", authMiddleware, authorMiddleware, getProducts);
router.get("/:id", authMiddleware, authorMiddleware, getProductById);
router.delete("/:id", authMiddleware, authorMiddleware, deleteProductById);
router.patch("/:id", authMiddleware, authorMiddleware, updateProductByIdPatch);
module.exports = router;
