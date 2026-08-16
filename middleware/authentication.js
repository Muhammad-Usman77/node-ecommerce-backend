const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      msg: `user UnOtherRized`,
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.id;

  next();
}

module.exports = { authMiddleware };
