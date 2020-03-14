var express = require("express");
var router = express.Router();

const filter = require("../../../controllers/filter");

router.get("/", filter.filterTabel);

module.exports = router;
