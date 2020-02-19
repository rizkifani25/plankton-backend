const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: Object,
  image_path: String,
  detail: String,
  description: String,
  alproType: Object,
  location: Object
});

module.exports = mongoose.model("reportModel", reportSchema, "reports");
