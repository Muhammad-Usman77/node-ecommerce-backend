const express = require("express")
const {authMiddleware } = require("../middleware/authentication")
const {authorMiddleware} = require("../middleware/authorization")
const {orderSchema} = require("../validation/orderValidation")
const validate = require("../middleware/validateMiddleware")
const { createOrder, getAllOrder, getOrderById, orderCancell, adminGetAllOrders, adminUpdateOrderStatus } = require("../controller/order");
const router = express.Router();


router.get("/getAllOrder", authMiddleware, getAllOrder)
router.post("/createOrder", authMiddleware, validate(orderSchema), createOrder)

router.get("/:id", authMiddleware, getOrderById)
router.patch("/:id", authMiddleware, orderCancell)

router.get("/admin/getAllOrders", authMiddleware, authorMiddleware, adminGetAllOrders)
router.post("/admin/status/:id", authMiddleware, authorMiddleware, adminUpdateOrderStatus)
module.exports = router;