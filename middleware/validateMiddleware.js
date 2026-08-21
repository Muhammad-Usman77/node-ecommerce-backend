// function validate(schema) {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);

//     if (error) {
//       return res.status(400).json({
//         msg: error.details[0].message,
//       });
//     }

//     next();
//   };
// }

// module.exports = validate;
function validate(schema, source = "body") {
  return (req, res, next) => {

    const data = req[source];

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    req[source] = value;

    next();
  };
}

module.exports = validate;

/*
validate(productIdSchema, "params")
validate(searchSchema, "query")
*/