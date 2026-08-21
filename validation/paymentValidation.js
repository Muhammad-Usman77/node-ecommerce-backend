const Joi = require("joi");

const paymentSchema = Joi.object({
  orderId: Joi.string()
    .required(),

  paymentMethod: Joi.string()
    .valid("cod", "card", "stripe")
    .required(),
});

module.exports = {
  paymentSchema,
};