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


//2
// function validate(schema, source = "body") {
//   return (req, res, next) => {

//     const data = req[source];

//     const { error, value } = schema.validate(data, {
//       abortEarly: false,
//       stripUnknown: true,
//     });

//     if (error) {
//       return res.status(400).json({
//         msg: "Validation failed",
//         errors: error.details.map((detail) => detail.message),
//       });
//     }

//     req[source] = value;

//     next();
//   };
// }

// module.exports = validate;



//3
function validate(schema, source = "body") {
  return (req, res, next) => {

    console.log("===== VALIDATION START =====");
    console.log("DATA BEFORE VALIDATION:", req[source]);

    const data = req[source];

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    console.log("VALIDATION ERROR:", error);
    console.log("VALIDATION VALUE:", value);

    if (error) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    req[source] = value;

    console.log("===== VALIDATION SUCCESS =====");
    console.log("REQ BODY AFTER VALIDATION:", req[source]);

    next();
  };
}

module.exports = validate;
/*
validate(productIdSchema, "params")
validate(searchSchema, "query")
*/