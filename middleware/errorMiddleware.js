// function errorMiddleware(error, req, res, next) {
//   console.error(error);

//   return res.status(500).json({
//     success: false,
//     message: error.message || "Internal Server Error",
//   });
// }

// module.exports = errorMiddleware;

function errorMiddleware(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
}

module.exports = errorMiddleware;