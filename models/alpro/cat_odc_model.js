const mongoose = require("mongoose");

const catODCSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sub_code: String,
  sub_cat_name: String
});

module.exports = mongoose.model("catODCModel", catODCSchema, "cat-odc");
