const { signupSchema, loginSchema } = require("../validation/authvalidation");
const validate = require("../middleware/validateMiddleware");
const express = require("express");
const {
  userCreate,
  userLogin,
  userLogout,
} = require("../controller/authController");
const router = express.Router();

router.post("/register",validate(signupSchema), userCreate);
router.post("/login",validate(loginSchema), userLogin);
router.post("/logout", userLogout);

module.exports = router;
