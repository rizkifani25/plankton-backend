var express = require("express");
var router = express.Router();

const alpro = require("../../controllers/alpro");

router.get("/", alpro.alpros);

module.exports = router;
