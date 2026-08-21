const Address = require("../model/address");

// 1. Add Address
async function addAddress(req, res) {
  const { fullName, phone, address, city, isDefault } = req.body;

  if (!fullName || !phone || !address || !city) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }

  // If this address is default,
  // remove default from user's other addresses
  if (isDefault === true) {
    await Address.updateMany(
      { userId: req.userId },
      { isDefault: false }
    );
  }

  const newAddress = await Address.create({
    userId: req.userId,
    fullName,
    phone,
    address,
    city,
    isDefault: isDefault || false,
  });

  return res.status(201).json({
    msg: "Address added successfully",
    data: newAddress,
  });
}


// 2. Get My Addresses
async function getMyAddresses(req, res) {
  const addresses = await Address.find({
    userId: req.userId,
  });

  return res.json({
    msg: "Addresses fetched successfully",
    data: addresses,
  });
}


// 3. Get Single Address
async function getSingleAddress(req, res) {
  const address = await Address.findOne({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!address) {
    return res.status(404).json({
      msg: "Address not found",
    });
  }

  return res.json({
    msg: "Address fetched successfully",
    data: address,
  });
}


// 4. Update Address
async function updateAddress(req, res) {

  const address = await Address.findOne({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!address) {
    return res.status(404).json({
      msg: "Address not found",
    });
  }

  // If making this address default,
  // remove default from other addresses
  if (req.body.isDefault === true) {
    await Address.updateMany(
      {
        userId: req.userId,
        _id: { $ne: req.params.id },
      },
      {
        isDefault: false,
      }
    );
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  return res.json({
    msg: "Address updated successfully",
    data: updatedAddress,
  });
}


// 5. Delete Address
async function deleteAddress(req, res) {

  const address = await Address.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!address) {
    return res.status(404).json({
      msg: "Address not found",
    });
  }

  return res.json({
    msg: "Address deleted successfully",
    data: address,
  });
}


module.exports = {
  addAddress,
  getMyAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress,
};