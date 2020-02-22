var express = require("express");
var router = express.Router();

const Status = require("../../../controllers/report/status");

router.get("/", Status.getStatus);

module.exports = router;
