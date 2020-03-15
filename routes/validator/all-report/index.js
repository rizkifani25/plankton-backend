var express = require("express");
var router = express.Router();

const getAllReport = require("../../../controllers/validator");

router.get("/", getAllReport.getAllReports);

module.exports = router;
