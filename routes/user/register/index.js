const express = require("express");
const router = express.Router();

const User = require("../../../controllers/user/register");

router.post("/", User.registerUser);

module.exports = router;
