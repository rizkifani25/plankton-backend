const mongoose = require("mongoose");

const catODPSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sub_code: String,
  sub_cat_name: String
});

module.exports = mongoose.model("catODPModel", catODPSchema, "cat-odp");
