const mongoose = require("mongoose");

const reportCount = mongoose.Schema({
    count: Number,
});

module.exports = mongoose.model("reportCountSchema", reportCount, "report-counts");