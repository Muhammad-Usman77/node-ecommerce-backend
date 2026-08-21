const Joi = require("joi");

const reviewSchema = Joi.object({
  productId: Joi.string()
    .required(),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),

  commentOne: Joi.string()
    .min(3)
    .max(500)
    .required(),
});

module.exports = {
  reviewSchema,
};