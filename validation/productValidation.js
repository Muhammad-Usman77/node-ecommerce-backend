const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .min(10)
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  stock: Joi.number()
    .integer()
    .min(0)
    .required(),

  category: Joi.string()
    .required(),
});
const updateProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100),

  description: Joi.string()
    .min(10),

  price: Joi.number()
    .positive(),

  stock: Joi.number()
    .integer()
    .min(0),

  category: Joi.string(),
});
module.exports = {
  productSchema, updateProductSchema
};