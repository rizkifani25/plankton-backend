const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: String,
  user_password: String,
  user_phone: String,
  user_level: String
});

module.exports = mongoose.model("userModel", userSchema, "user");
