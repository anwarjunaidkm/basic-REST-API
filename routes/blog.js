const express = require("express");
const router = express.Router();

const blogController = require("../Controllers/blogController");

router.get("/post", blogController.showPosts);
router.post("/post", blogController.createPost);
module.exports = router;
