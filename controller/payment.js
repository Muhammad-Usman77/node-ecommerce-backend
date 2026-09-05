const Payment = require("../model/payment");
const Order = require("../model/order");

async function createPayment(req, res) {
  const { orderId, paymentMethod } = req.body;

  // 1. Check required fields
  if (!orderId || !paymentMethod) {
    return res.status(400).json({
      msg: "orderId and paymentMethod are required",
    });
  }

  // 2. Find user's order
  const order = await Order.findOne({
    _id: orderId,
    userId: req.userId,
  });

  if (!order) {
    return res.status(404).json({
      msg: "Order not found",
    });
  }

  // 3. Check if payment already exists
  const existingPayment = await Payment.findOne({
    orderId: orderId,
  });

  if (existingPayment) {
    return res.status(400).json({
      msg: "Payment already exists for this order",
    });
  }

  // 4. Create payment
  const payment = await Payment.create({
    orderId: order._id,
    userId: req.userId,
    amount: order.totalAmount,
    paymentMethod,
  });

  return res.status(201).json({
    msg: "Payment created successfully",
    data: payment,
  });
}
async function getMyPayments(req, res) {

  const payments = await Payment.find({
    userId: req.userId,
  }).populate("orderId");

  return res.json({
    msg: "Payments fetched successfully",
    data: payments,
  });
}
// async function updatePaymentStatus(req, res) {
//   const { paymentStatus } = req.body;

//   if (!paymentStatus) {
//     return res.status(400).json({
//       msg: "paymentStatus is required",
//     });
//   }

//   const allowedStatus = ["pending", "paid", "failed", "refunded"];

//   if (!allowedStatus.includes(paymentStatus)) {
//     return res.status(400).json({
//       msg: "Invalid payment status",
//     });
//   }

//   const payment = await Payment.findByIdAndUpdate(
//     req.params.id,
//     {
//       paymentStatus,
//     },
//     {
//       new: true,
//     }
//   );

//   if (!payment) {
//     return res.status(404).json({
//       msg: "Payment not found",
//     });
//   }
// if (paymentStatus === "paid") {
//   await Order.findByIdAndUpdate(
//     payment.orderId,
//     {
//       status: "confirmed",
//     },
//     {
//       new: true,
//     }
//   );
// }
//   return res.json({
//     msg: "Payment status updated successfully",
//     data: payment,
//   });
// }
async function updatePaymentStatus(req, res) {
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    return res.status(400).json({
      msg: "paymentStatus is required",
    });
  }

  const allowedStatus = [
    "pending",
    "paid",
    "failed",
    "refunded",
  ];

  if (!allowedStatus.includes(paymentStatus)) {
    return res.status(400).json({
      msg: "Invalid payment status",
    });
  }

  const payment = await Payment.findByIdAndUpdate(
    req.params.id,
    {
      paymentStatus,
    },
    {
      new: true,
    }
  );

  if (!payment) {
    return res.status(404).json({
      msg: "Payment not found",
    });
  }

  // Payment paid → Order confirmed
 if (paymentStatus === "paid") {
  await Order.findByIdAndUpdate(
    payment.orderId,
    {
      status: "confirmed",
    }
  );
}

if (paymentStatus === "failed") {
  await Order.findByIdAndUpdate(
    payment.orderId,
    {
      status: "failed",
    }
  );
}

  return res.json({
    msg: "Payment status updated successfully",
    data: payment,
  });
}

async function refundPayment(req, res) {
  const payment = await Payment.findById(req.params.id);

  // 1. Payment exist?
  if (!payment) {
    return res.status(404).json({
      msg: "Payment not found",
    });
  }

  // 2. Only paid payment can be refunded
  if (payment.paymentStatus !== "paid") {
    return res.status(400).json({
      msg: "Only paid payment can be refunded",
    });
  }

  // 3. Update payment status
  payment.paymentStatus = "refunded";

  await payment.save();

  // 4. Update related order
  await Order.findByIdAndUpdate(
    payment.orderId,
    {
      status: "cancelled",
    }
  );

  return res.json({
    msg: "Payment refunded successfully",
    data: payment,
  });
}
// controller/payment.js mein naya function add karna hoga
async function adminGetAllPayments(req, res) {
  const payments = await Payment.find({}).populate("orderId");
  return res.json({ msg: "All payments fetched", data: payments });
}

module.exports = {
  createPayment, getMyPayments, updatePaymentStatus, refundPayment, adminGetAllPayments,
};