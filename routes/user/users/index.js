var express = require("express");
var router = express.Router();

const User = require("../../../controllers/user");

router.get("/", User.all_user);

module.exports = router;
