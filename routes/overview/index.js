var express = require("express");
var router = express.Router();

const overview = require("../../controllers/filter");

router.get("/", overview.countReportByRegional);

module.exports = router;
