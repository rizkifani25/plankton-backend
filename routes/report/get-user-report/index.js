var express = require("express");
var router = express.Router();

const Reports = require("../../../controllers/report");

router.get("/", Reports.getReportByUser);

module.exports = router;
