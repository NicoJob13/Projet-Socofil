const express = require("express");
const postController = require("../controllers/post.controllers");

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.put("/:id", postController.modifyPost);
router.delete("/:id", postController.deletePost);

module.exports = router;
