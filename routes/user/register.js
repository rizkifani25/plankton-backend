const express = require("express");
const router = express.Router();

const User = require("../../controllers/user_controller");

router.get("/", User.register_user);

module.exports = router;
