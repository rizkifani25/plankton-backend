const mongoose = require("mongoose");

const alproDescSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  alpro_code: String,
  descriptions: Array
});

module.exports = mongoose.model(
  "alproDescModel",
  alproDescSchema,
  "alpros-cat"
);
