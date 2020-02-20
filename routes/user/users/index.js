var express = require("express");
var router = express.Router();

const User = require("../../../controllers/user");

router.get("/", User.allUser);

module.exports = router;
