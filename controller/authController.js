const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
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
  const hashedPassword = await bycrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.cookie("token", token);

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
    return res.json({
      msg: `email or password is not correct`,
    });
  }

  const isCorrectPassword = await bycrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.json({ msg: `email or password in incorrect` });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.json({ msg: `user successfully login` });
}

async function userLogout(req, res) {
  res.clearCookie("token");

  return res.json({ msg: `user successfully logout` });
}

module.exports = { userCreate, userLogin, userLogout };
