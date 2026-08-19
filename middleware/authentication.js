// const jwt = require("jsonwebtoken");

// async function authMiddleware(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.json({
//       msg: `user UnOtherRized`,
//     });
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   req.userId = decoded.id;

//   next();
// }

// module.exports = { authMiddleware };



const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  let token;

  // 1. First check Authorization Bearer Token
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. If Bearer Token is not available, check cookie
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  // 3. If no token found
  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized - token required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
}

module.exports = { authMiddleware };