var express = require("express");
var router = express.Router();

const AlproODC = require("../../controllers/alpro/cat_odc_controller");

router.get("/", AlproODC.alpro_odc);

module.exports = router;
