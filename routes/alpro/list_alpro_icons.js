var express = require("express");
var router = express.Router();

const AlproIcons = require("../../controllers/alpro/cat_icons_controller");

router.get("/", AlproIcons.alpro_icons);

module.exports = router;
