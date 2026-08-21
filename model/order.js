const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "productModel",
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        totalPrice: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
  type: String,
  enum: [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
    "failed"
  ],
  default: "pending"
},
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
