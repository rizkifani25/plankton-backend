var express = require("express");
var router = express.Router();

const User = require("../../controllers/user_controller");

router.get("/", User.all_user);

module.exports = router;
