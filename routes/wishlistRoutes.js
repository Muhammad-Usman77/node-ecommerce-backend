const express = require("express");

const { authMiddleware } = require("../middleware/authentication");
const { testError } = require("../controller/wishlist");
const asyncHandler = require("../middleware/asyncHandler");
const { addToWishlist, getMyWishlist, removeFromWishlist } = require("../controller/wishlist");

const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);

router.get("/my", authMiddleware, getMyWishlist);

router.delete("/remove", authMiddleware, removeFromWishlist)

router.get("/test-error", asyncHandler(testError))
module.exports = router;
