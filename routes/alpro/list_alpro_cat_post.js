var express = require("express");
var router = express.Router();

const AlproPost = require("../../controllers/alpro/cat_post_controller");

router.get("/", AlproPost.alpro_post);

module.exports = router;
