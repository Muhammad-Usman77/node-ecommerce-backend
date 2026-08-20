const express = require("express");

const { authMiddleware } = require("../middleware/authentication");

const { addToWishlist, getMyWishlist, removeFromWishlist } = require("../controller/wishlist");

const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);

router.get("/my", authMiddleware, getMyWishlist);

router.delete("/remove", authMiddleware, removeFromWishlist)
module.exports = router;
