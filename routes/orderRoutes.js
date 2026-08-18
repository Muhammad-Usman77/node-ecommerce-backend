const express = require("express")
const {authMiddleware } = require("../middleware/authentication")
const {authorMiddleware} = require("../middleware/authorization");
const { createOrder, getAllOrder, getOrderById, orderCancell } = require("../controller/order");
const router = express.Router();


router.get("/getAllOrder", authMiddleware, authorMiddleware, getAllOrder)
router.post("/createOrder", authMiddleware, authorMiddleware, createOrder)

router.get("/:id", authMiddleware, authorMiddleware, getOrderById)
router.patch("/:id", authMiddleware, authorMiddleware, orderCancell)

module.exports = router;