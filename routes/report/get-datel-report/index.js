var express = require("express");
var router = express.Router();

const Reports = require("../../../controllers/odp");

router.get("/", Reports.getODPByDatel);

module.exports = router;
