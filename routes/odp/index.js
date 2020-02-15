var express = require("express");
var router = express.Router();

const odp = require("../../controllers/odp");

router.get("/", odp.allODP);

module.exports = router;
