const Product = require("../model/productModel")
const Cart = require("../model/cart")
const Order = require("../model/order")



async function createOrder(req, res) {
  const { shippingAddress } = req.body;

  // 1. Check shipping address
  if (!shippingAddress) {
    return res.status(400).json({
      msg: "Shipping address is required",
    });
  }

  // 2. Get current user's cart
  const cartItems = await Cart.find({
    userId: req.userId,
  });

  // 3. Check cart
  if (cartItems.length === 0) {
    return res.status(400).json({
      msg: "Cart is empty",
    });
  }

  // 4. Convert cart items into order products
  const products = cartItems.map((item) => ({
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.totalPrice,
  }));

  // 5. Calculate total order amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  // 6. Create order
  const order = await Order.create({
    userId: req.userId,
    products,
    totalAmount,
    shippingAddress,
  });

  // 7. Clear user's cart
  await Cart.deleteMany({
    userId: req.userId,
  });

  return res.status(201).json({
    msg: "Order created successfully",
    data: order,
  });
}


async function getAllOrder(req, res){
    const getAllOrders = await Order.find({userId:req.userId})

    return res.json({msg:`all orders getting successfully`})
}
module.exports = {
  createOrder, getAllOrder
};