const Review = require("../model/review")
const Product = require("../model/productModel")
async function createReview(req, res){
    const body = req.body
    const { productId, rating, commentOne} = req.body
  
    if(!productId || !rating || !commentOne){
        return res.json({
            msg:`These  field is required`
        })
    }
 
    // check product exist
    const product = await Product.findById(productId)

    if(!product){
        return res.json({msg:`product not exist`})
    }

    if(rating <1 || rating >5){
        return res.json({
            msg:`Rating must be between 1 and 5`
        })
    }
   
    const review = await Review.create({
         userId: req.userId,
         productId,
        rating,
        commentOne
    })

    return res.json({
        msg:`Review created Sucessfully`,
        data:review,
    })
}
async function getProductReviews(req, res) {

  const { productId } = req.params;

  // Check product exists
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      msg: "Product not found",
    });
  }

  // Get reviews
  const reviews = await Review.find({
    productId: productId,
  }).populate("userId", "name");

  return res.json({
    msg: "Product reviews fetched successfully",
    data: reviews,
  });
}
async function updateReview(req, res) {

  const { rating, commentOne } = req.body;

  const review = await Review.findOne({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!review) {
    return res.status(404).json({
      msg: "Review not found or you are not the owner",
    });
  }

  if (rating !== undefined) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        msg: "Rating must be between 1 and 5",
      });
    }

    review.rating = rating;
  }

  if (commentOne !== undefined) {
    review.commentOne = commentOne;
  }

  await review.save();

  return res.json({
    msg: "Review updated successfully",
    data: review,
  });
}
async function deleteReview(req, res) {

  const review = await Review.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!review) {
    return res.status(404).json({
      msg: "Review not found or you are not the owner",
    });
  }

  return res.json({
    msg: "Review deleted successfully",
    data: review,
  });
}
module.exports = {createReview, getProductReviews, updateReview, deleteReview}