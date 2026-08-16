const User = require("../model/authModel");

async function authorMiddleware(req, res, next) {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.json({ msg: `user not found` });
  }

  if (user.role !== "admin") {
    return res.json({ msg: `access denied for admin` });
  }
  next();
}

module.exports = { authorMiddleware };
