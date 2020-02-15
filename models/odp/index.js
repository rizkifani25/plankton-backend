const mongoose = require("mongoose");

const odpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ODP_NAME: String,
  LATITUDE: String,
  LONGITUDE: String,
  REGIONAL: String,
  WITEL: String,
  DATEL: String,
  STO: String
});

module.exports = mongoose.model("odpModel", odpSchema, "list-odp");
