var express = require("express");
var router = express.Router();

const Report = require("../../../controllers/report/list-report");

router.post("/", Report.listReport);

module.exports = router;
