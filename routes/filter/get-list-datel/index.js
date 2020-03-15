var express = require("express");
var router = express.Router();

const listDatel = require("../../../controllers/filter");

router.get("/", listDatel.getListDatel);

module.exports = router;
