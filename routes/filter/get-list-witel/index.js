var express = require("express");
var router = express.Router();

const listWitel = require("../../../controllers/filter");

router.get("/", listWitel.getListWitel);

module.exports = router;
