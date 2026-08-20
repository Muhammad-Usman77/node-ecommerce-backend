const Product = require("../model/productModel");
const Cart = require("../model/cart");
const Order = require("../model/order");

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

  for (const item of cartItems) {

  const product = await Product.findById(item.productId);

  if (!product) {
    return res.status(404).json({
      msg: `Product ${item.name} not found`,
    });
  }

  if (item.quantity > product.stock) {
    return res.status(400).json({
      msg: `Not enough stock for ${item.name}`,
    });
  }
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
    0,
  );

  // 6. Create order
  const order = await Order.create({
    userId: req.userId,
    products,
    totalAmount,
    shippingAddress,
  });

// 7. Decrease product stock
for (const item of cartItems) {
  await Product.findByIdAndUpdate(
    item.productId,
    {
      $inc: { stock: -item.quantity },
    }
  );
}

  // 7. Clear user's cart
  await Cart.deleteMany({
    userId: req.userId,
  });

  return res.status(201).json({
    msg: "Order created successfully",
    data: order,
  });

}

async function getAllOrder(req, res) {
  const getAllOrders = await Order.find({ userId: req.userId });

  return res.json({
    msg: `All orders getting successfully`,
    data: getAllOrders,
  });
}

async function getOrderById(req, res) {
  const orderById = await Order.findOne({_id:req.params.id, userId: req.userId });

  return res.json({ msg: `Get Order By Id`, data: orderById });
}

async function orderCancell(req, res){
    const order = await Order.findOne({
        userId: req.userId,
        _id:req.params.id,
    })

    if(!order){
        return res.json({
            msg:`order not found`
        })
    };

    if(order.status === "shipped" || order.status === "delivered"){
        return res.json({
            msg:`order not cancell`
        })
    }

   if(order.status == "cancelled"){
    return res.json({
        msg:`Order Already cancelled`
    })
   }
for (const item of order.products) {
  await Product.findByIdAndUpdate(
    item.productId,
    {
      $inc: { stock: item.quantity },
    }
  );
}
   order.status = "cancelled"
   await order.save()
return res.json({
    msg:`Order Cancelled`, data:order
})
}
async function adminGetAllOrders(req, res) {
  const orders = await Order.find({});

  return res.json({
    msg: "All orders fetched successfully",
    data: orders,
  });
}
// es main userId ki zarorat nh. q kh admin kisi bhi user status update kr skta hai
async function adminUpdateOrderStatus(req, res) {
  const { status } = req.body;

  // 1. Check status
  const allowedStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!status) {
    return res.status(400).json({
      msg: "Order status is required",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      msg: "Invalid order status",
      allowedStatuses,
    });
  }

  // 2. Find order
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      msg: "Order not found",
    });
  }

  // 3. Update status
  order.status = status;

  await order.save();

  return res.json({
    msg: "Order status updated successfully",
    data: order,
  });
}

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById, 
  orderCancell,
  adminGetAllOrders, 
  adminUpdateOrderStatus
};
