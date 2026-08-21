const Wishlist = require("../model/wishlist");
const Product = require("../model/productModel");
const AppError = require("../utils/AppErrors")
async function addToWishlist(req, res) {

  const { productId } = req.body;

  // 1. Check productId
  if (!productId) {
    return res.status(400).json({
      msg: "productId is required",
    });
  }

  // 2. Check product exists
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      msg: "Product not found",
    });
  }

  // 3. Check already in wishlist
  const alreadyExists = await Wishlist.findOne({
    userId: req.userId,
    productId: productId,
  });

  if (alreadyExists) {
    return res.status(400).json({
      msg: "Product already exists in wishlist",
    });
  }

  // 4. Create wishlist
  const wishlist = await Wishlist.create({
    userId: req.userId,
    productId: productId,
  });

  return res.status(201).json({
    msg: "Product added to wishlist",
    data: wishlist,
  });
}
async function getMyWishlist(req, res) {

  const wishlist = await Wishlist.find({
    userId: req.userId,
  }).populate("productId");

  return res.json({
    msg: "Wishlist fetched successfully",
    data: wishlist,
  });
}
async function removeFromWishlist(req, res) {

  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      msg: "productId is required",
    });
  }

  const wishlist = await Wishlist.findOneAndDelete({
    userId: req.userId,
    productId: productId,
  });

  if (!wishlist) {
    return res.status(404).json({
      msg: "Product not found in your wishlist",
    });
  }

  return res.json({
    msg: "Product removed from wishlist",
    data: wishlist,
  });
}

async function testError(req, res) {
  throw new AppError(
    "Testing custom error",
    404
  );
}
module.exports = {
  addToWishlist, getMyWishlist, removeFromWishlist, testError
};