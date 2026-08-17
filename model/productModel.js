const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
name:{
    type:String,
},
description:{
     type:String,
     required:true
},
price:{
    type:Number,
    required:true,
},
category:{
    type:String,
    required:true
},
brand:{
    type:String,
},
stock:{
    type:Number,
    required:true,
    default:0,
},
images:{
    type:[String],
    default:[]
},
rating:{
type:Number,
},
isActive:{
    type:Boolean,
    default:true
},

}, {timestamps:true})

const Product = mongoose.model("productModel",productSchema);

module.exports = Product;

