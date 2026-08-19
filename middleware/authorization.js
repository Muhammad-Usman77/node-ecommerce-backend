const User = require("../model/authModel");

async function authorMiddleware(req, res, next) {
  const user = await User.findById(req.userId);
  console.log("USER:", user);
  console.log("ROLE:", user?.role);
  if (!user) {
    return res.json({ msg: `user not found` });
  }

  if (user.role !== "admin") {
    return res.json({ msg: `access denied ` });
  }
   console.log("ADMIN ACCESS GRANTED");
  next();
}

module.exports = { authorMiddleware };
