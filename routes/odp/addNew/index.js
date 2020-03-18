var express = require("express");
var router = express.Router();

const newODP = require("../../../controllers/odp");

router.get("/", newODP.addNewODP);

module.exports = router;
