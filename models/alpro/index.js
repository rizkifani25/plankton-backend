const mongoose = require("mongoose");

const alproSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  alpro_name: String,
  alpro_code: String,
  icon_path: String
});

module.exports = mongoose.model("alprosModel", alproSchema, "alpros");
