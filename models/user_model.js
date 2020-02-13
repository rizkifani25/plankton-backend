const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  reporter_name: String,
  reporter_phone: String
});

module.exports = mongoose.model("userModel", userSchema, "user");
