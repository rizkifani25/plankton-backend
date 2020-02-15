const mongoose = require("mongoose");

const alproSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  alpro_name: String,
  alpro_code: String,
  icon_path: String
});

const alproDescSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  alpro_code: String,
  descriptions: Array
});

module.exports = mongoose.model("alprosModel", alproSchema, "alpros");

module.exports = mongoose.model(
  "alproDescModel",
  alproDescSchema,
  "alpros-cat"
);
