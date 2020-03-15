var express = require("express");
var router = express.Router();

const userReports = require("../../../controllers/user");

router.get("/", userReports.getReportByUser);

module.exports = router;
