var express = require("express");
var router = express.Router();

const User = require("../../../controllers/user/login");

router.post("/", User.loginUser);

module.exports = router;
