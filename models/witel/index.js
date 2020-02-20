const mongoose = require("mongoose");

const witelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  WITEL: String,
  DATEL: Array
});

module.exports = mongoose.model("witelModel", witelSchema, "list-witel");
