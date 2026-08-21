const Joi = require("joi");

const orderSchema = Joi.object({
  shippingAddress: Joi.string()
    .min(5)
    .max(300)
    .required(),
});

module.exports = {
  orderSchema,
};