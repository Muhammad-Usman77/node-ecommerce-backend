const Product = require("../model/productModel");
const Cart = require("../model/cart")

async function addToCart(req, res){

    //     console.log("REQ BODY:", req.body);
    // console.log("CONTENT TYPE:", req.headers["content-type"]);
    const {productId, quantity} = req.body;

    if(!productId || !quantity){
        return res.json({msg:`productId and quantity are required`})
    }

    //find product
const product = await Product.findById(productId)

if(!product){
    return res.json({msg:`product not found`})
}

//check stock
if(quantity > product.stock){
    return res.json({msg:`quantity is not enough available`})
}

const existingCart = await Cart.findOne({
    userId: req.userId,
    productId: product._id,
})

if(existingCart){
    existingCart.quantity += quantity;
    existingCart.totalPrice = existingCart.quantity * product.price
    await existingCart.save()
    return res.json({msg:`cart quantity updated successfully`})
}



const totalPrice = quantity * product.price

const cart = await Cart.create({
userId:req.userId,
productId:product._id.toString(),
name:product.name,
description:product.description,
quantity:quantity,
price:product.price,
images:product.images,
totalPrice:totalPrice,
})
return res.json({msg:`product successfully addToCart`, data:cart})
}

async function getCart(req, res){
    const getCart = await Cart.find({});
    return res.json({msg:`All Cart Product`, data:getCart},)
}

async function updateCartQuantity(req, res){
    const {cartId,quantity} = req.body;

    if(!cartId|| !quantity){
        return res.json({
            msg:`cardId and quantity is required`
        })
    }

    if(quantity<=0){
        return json.res({msg:`qunatity must be greter than 0`})
    }

    const cart = await Cart.findOne({
        _id :cartId,
        userId:req.userId
    })
    if(!cart){
        return res.json({
            msg:`cart not found`
        })
    }

    cart.quantity = quantity ;
    cart.totalPrice = quantity * cart.price

    await cart.save()

    return res.json({
        msg:`cart quantity updated Successfully`,
        data:cart
    })
}

// es sy complete 1  product remove hoga. chahy quantity jo bhi ho.
// async function removeFromCart(req, res){
//     const {cartId} = req.body;

//     if(!cartId){
//         return res.json({
//             msg:`cartId is required`
//         })
//     }

//     const cart = await Cart.findByIdAndDelete({
//         _id :cartId,
//         userId : req.userId,
//     })

//     if(!cart){
//         return res.json({
//             msg:`cart item not found`
//         })
//     }
//     return res.json({
//         msg:`Product remove from cart successfully`,
//         data:cart,

//     })
// }

async function clearCart(req, res){
        const result =  await Cart.deleteMany({
            userId : req.userId,
         })

         return res.json({
            msg:`cart clear`,
            deletedCount: result.deletedCount
         })
}
module.exports = {addToCart, getCart, updateCartQuantity, removeFromCart, clearCart}