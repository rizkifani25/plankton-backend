var express = require("express");
var router = express.Router();

const AlproCable = require("../../controllers/alpro/cat_cable_controller");

router.get("/", AlproCable.alpro_cable);

module.exports = router;
