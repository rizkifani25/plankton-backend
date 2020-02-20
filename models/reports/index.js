const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_phone: String,
  image_path: String,
  detail: String,
  description: String,
  alproType: {
    alpro_name_code: String,
    alpro_name: String,
    alpro_code: String,
    icon_path: String
  },
  location: {
    latitude: String,
    longitude: String,
    datel: String,
    witel: String
  }
});

module.exports = mongoose.model("reportModel", reportSchema, "reports");
