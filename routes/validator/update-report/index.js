var express = require("express");
var router = express.Router();

const updateReport = require("../../../controllers/validator");

router.post("/", updateReport.updateReport);

module.exports = router;
