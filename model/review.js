const mongoose =require("mongoose")


const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"model"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"productModel"
    },
    rating:{
        type:Number,
        required:true,
        min: 1,
        max: 5,
    },
    commentOne:{
        type:String,
        required:true,
    }
});


const Review = mongoose.model("review", reviewSchema) 

module.exports = Review