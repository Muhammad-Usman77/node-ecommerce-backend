const express = require("express");
const { authMiddleware } = require("../middleware/authentication");
const { authorMiddleware } = require("../middleware/authorization");
const upload = require("../middleware/uploads");
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


//searching
router.get("/search", authMiddleware, searchByName);
(router.get("/filterByCategory", authMiddleware, filterByCategory,),
  router.get( "/proudctFilter", authMiddleware, productFilter,));
router.get("/filterByPrice", authMiddleware, filterByPrice);
router.get("/pagenation", authMiddleware, pagenation);
router.get("/sort", authMiddleware, sorting);

//crud
router.post("/create", authMiddleware, authorMiddleware, upload.array("images", 5), createProduct);
router.get("/getAll", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);
router.delete("/:id", authMiddleware, authorMiddleware, deleteProductById);
router.patch("/:id", authMiddleware, authorMiddleware, updateProductByIdPatch);

//router.
module.exports = router;
