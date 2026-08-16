const express = require("express");
const {
  userCreate,
  userLogin,
  userLogout,
} = require("../controller/authController");
const router = express.Router();

router.post("/register", userCreate);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;
