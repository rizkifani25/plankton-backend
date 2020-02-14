const mongoose = require("mongoose");

const catIconsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cat_icon_name: String,
  cat_icon_path: String
});

module.exports = mongoose.model("catIconsModel", catIconsSchema, "cat-icon");
