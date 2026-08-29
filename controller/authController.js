const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
  // res.cookie("token", token);
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

async function userCreate(req, res) {
  const { name, email, password } = req.body;

  const isExistAlready = await User.findOne({ email });
  if (!name || !email || !password) {
    return res.json({ msg: `these file are required` });
  }

  if (isExistAlready) {
    return res.json({
      msg: `user already exist`,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

  res.cookie("token", token, cookieOptions);
  return res.json({ msg: `account successfully created` });
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      msg: `email or password wrogn`,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      msg: `Email or password is incorrect`,
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.json({ msg: `email or password in incorrect` });
  }

  const token = jwt.sign({ id: user.id, role:user.role }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.json({ msg: `user successfully login`,  user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,   // ✅ YEH SABSE ZAROORI LINE HAI
    }, token });
}

async function userLogout(req, res) {
  res.clearCookie("token", cookieOptions);

  return res.json({ msg: `user successfully logout` });
}

module.exports = { userCreate, userLogin, userLogout };
