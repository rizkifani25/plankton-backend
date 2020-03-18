var express = require("express");
var router = express.Router();

const overview = require("../../controllers/filter");

router.get("/", overview.improvedOverview);

module.exports = router;
