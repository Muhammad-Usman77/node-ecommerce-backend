const express = require("express");

const { authMiddleware } = require("../middleware/authentication");

const {
  addAddress,
  getMyAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/address");

const router = express.Router();

// Add Address
router.post("/add", authMiddleware, addAddress);

// Get My All Addresses
router.get("/my", authMiddleware, getMyAddresses);

// Get Single Address
router.get("/:id", authMiddleware, getSingleAddress);

// Update Address
router.patch("/:id", authMiddleware, updateAddress);

// Delete Address
router.delete("/:id", authMiddleware, deleteAddress);

module.exports = router;
