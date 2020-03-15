var express = require("express");
var router = express.Router();

const listRegional = require("../../../controllers/filter");

router.get("/", listRegional.getListRegional);

module.exports = router;
