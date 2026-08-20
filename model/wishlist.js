const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "model",
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "productModel",
    },
  },
  { timestamps: true }
);


const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = Wishlist;