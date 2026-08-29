// const Joi = require("joi");

// const productSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(100)
//     .required(),

//   description: Joi.string()
//     .min(10)
//     .required(),

//   price: Joi.number()
//     .positive()
//     .required(),

//   stock: Joi.number()
//     .integer()
//     .min(0)
//     .required(),

//   category: Joi.string()
//     .required(),
// });
// const updateProductSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(100),

//   description: Joi.string()
//     .min(10),

//   price: Joi.number()
//     .positive(),

//   stock: Joi.number()
//     .integer()
//     .min(0),

//   category: Joi.string(),
// });
// module.exports = {
//   productSchema, updateProductSchema
// };


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

  // ✅ YEH FIELDS ADD KAREIN (jo Flutter se aa rahi hain)
  brand: Joi.string().allow("").optional(),
  rating: Joi.number().min(0).max(5).optional(),
  images: Joi.any().optional(),   // ✅ Multer alag se handle karta hai, isliye "any"
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  category: Joi.string(),

  // ✅ YEH BHI ADD KAREIN
  brand: Joi.string().allow(""),
  rating: Joi.number().min(0).max(5),
  images: Joi.any(),
});

module.exports = {
  productSchema,
  updateProductSchema,
};








// function validate(schema, source = "body") {
//   return (req, res, next) => {

//     console.log("===== VALIDATION START =====");
//     console.log("DATA BEFORE VALIDATION:", req[source]);

//     const data = req[source];

//     const { error, value } = schema.validate(data, {
//       abortEarly: false,
//       stripUnknown: true,
//     });

//     console.log("VALIDATION ERROR:", error);
//     console.log("VALIDATION VALUE:", value);

//     if (error) {
//       return res.status(400).json({
//         msg: "Validation failed",
//         errors: error.details.map((detail) => detail.message),
//       });
//     }

//     req[source] = value;

//     console.log("===== VALIDATION SUCCESS =====");
//     console.log("REQ BODY AFTER VALIDATION:", req[source]);

//     next();
//   };
// }

// module.exports = validate;