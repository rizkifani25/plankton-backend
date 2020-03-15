var express = require("express");
var router = express.Router();

const listAllWitel = require("../../../controllers/filter");

router.get("/", listAllWitel.getAllWitel);

module.exports = router;
