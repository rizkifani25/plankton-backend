var express = require("express");
var router = express.Router();

const Status = require("../../../services/status");

router.get("/", Status.getStatus);

module.exports = router;
