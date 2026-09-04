const Joi = require("joi");

const addressSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .required(),

  phone: Joi.string()
    .min(10)
    .max(15)
    .required(),

  city: Joi.string()
    .min(2)
    .max(50)
    .required(),

      // ✅ YEH LINE ADD KAREIN
  isDefault: Joi.boolean().optional(),
  address: Joi.string()
    .min(5)
    .max(200)
    .required(),
}).unknown(false);

module.exports = {
  addressSchema,
};