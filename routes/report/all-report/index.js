var express = require("express");
var router = express.Router();

const Reports = require("../../../controllers/report");

router.post("/", Reports.getAllReports);

module.exports = router;
