var express = require("express");
var router = express.Router();

const AlproODP = require("../../controllers/alpro/cat_odp_controller");

router.get("/", AlproODP.alpro_odp);

module.exports = router;
