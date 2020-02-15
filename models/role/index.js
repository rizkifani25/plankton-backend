const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_level: String,
  teritory: Array
});

module.exports = mongoose.model("roleModel", roleSchema, "role-authority");
