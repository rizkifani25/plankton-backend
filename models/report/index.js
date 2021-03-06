const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  _id: String,
  user_phone: String,
  user_name: String,
  image_path: String,
  detail: String,
  description: String,
  alproType: {
    alpro_name: String,
    alpro_code: String,
    icon_path: String
  },
  location: {
    latitude: String,
    longitude: String,
    datel: String,
    witel: String,
    sto: String,
    reg: String,
    ODP_NAME: String
  },
  status: Object,
  date: String
});

module.exports = mongoose.model("reportModel", reportSchema, "reports");