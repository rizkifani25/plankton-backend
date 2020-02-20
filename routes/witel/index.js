var express = require("express");
var router = express.Router();

const witel = require("../../controllers/witel");

router.get("/", witel.getWitel);

module.exports = router;
