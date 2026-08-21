const express = require("express");

const { authMiddleware } = require("../middleware/authentication");

const { createReview, getProductReviews, updateReview, deleteReview } = require("../controller/review");

const {reviewSchema} = require("../validation/reviewValidation")
const validate = require("../middleware/validateMiddleware")

const router = express.Router();

router.post("/create", authMiddleware, validate(reviewSchema), createReview);
router.get("/product/:productId", authMiddleware, getProductReviews);
router.patch("/:id", authMiddleware, updateReview)
router.delete("/:id", authMiddleware, deleteReview)
module.exports = router;