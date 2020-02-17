var express = require("express");
var router = express.Router();

const User = require("../../../controllers/auth");

router.post("/", User.getUserLogin);

module.exports = router;
