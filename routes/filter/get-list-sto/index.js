var express = require("express");
var router = express.Router();

const listSTO = require("../../../controllers/filter");

router.get("/", listSTO.getListSTO);

module.exports = router;
