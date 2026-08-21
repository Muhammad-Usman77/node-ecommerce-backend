const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "model",
    },

    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Address = mongoose.model("address", addressSchema);

module.exports = Address;

/*
POST    /address/add        → Add Address
GET     /address/my         → Get My Addresses
GET     /address/:id        → Get Single Address
PATCH   /address/:id        → Update Address
DELETE  /address/:id        → Delete Address
*/