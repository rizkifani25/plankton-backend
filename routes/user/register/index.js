const express = require("express");
const router = express.Router();

const User = require("../../../controllers/user");

router.post("/", User.registerUser);

module.exports = router;
