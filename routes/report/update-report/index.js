var express = require("express");
var router = express.Router();

const Reports = require("../../../controllers/report");

router.post("/", Reports.updateReport);

module.exports = router;
