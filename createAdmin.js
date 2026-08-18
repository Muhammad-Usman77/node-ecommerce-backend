const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./model/authModel");
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();

//node createAdmin.js
//es commnad ko aik dafa run krna hai. phir aik project makn dobara nh.