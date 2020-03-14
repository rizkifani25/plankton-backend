var express = require("express");
var router = express.Router();

const counter = require("../../../controllers/filter");

router.get("/", counter.countReportByRegional);

module.exports = router;
