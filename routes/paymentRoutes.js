const express = require("express");

const { authMiddleware } = require("../middleware/authentication");
const { paymentSchema } = require("../validation/paymentValidation");
const validate = require("../middleware/validateMiddleware");
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
  validate(paymentSchema),
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