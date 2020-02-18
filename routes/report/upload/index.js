var express = require("express");
var router = express.Router();

const Report = require("../../../controllers/report/upload");

router.post("/", Report.uploadReport);

module.exports = router;
