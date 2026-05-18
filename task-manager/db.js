const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("monogodb connected successfully.");
  } catch (error) {
    console.log("monogodb connection failed.", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
