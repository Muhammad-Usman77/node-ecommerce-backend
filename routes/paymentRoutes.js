const express = require("express");

const { authMiddleware } = require("../middleware/authentication");

const {
  createPayment, getMyPayments, updatePaymentStatus,
  refundPayment
} = require("../controller/payment");
const { authorMiddleware } = require("../middleware/authorization");

const router = express.Router();
router.patch(
  "/:id/status",
  authMiddleware,
  authorMiddleware,
  updatePaymentStatus
);

router.post(
  "/create",
  authMiddleware,
  createPayment
);

router.get(
  "/my",
  authMiddleware,
  getMyPayments
);

router.patch(
  "/:id/refund",
  authMiddleware,
  authorMiddleware,
  refundPayment
);

module.exports = router;