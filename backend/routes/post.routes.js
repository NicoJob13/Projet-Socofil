const express = require("express");
const postController = require("../controllers/post.controllers");
const { uploadImage } = require("../middleware/multer.middlewares");

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", uploadImage, postController.createPost);
router.put("/:id", uploadImage, postController.modifyPost);
router.delete("/:id", postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/stoplike-post/:id", postController.stopLikePost);
router.patch("/dislike-post/:id", postController.dislikePost);
router.patch("/stopdislike-post/:id", postController.stopDislikePost);

router.patch("/comment-post/:id", postController.commentPost);
router.patch("/editcomment-post/:id", postController.editCommentPost);
router.patch("/deletecomment-post/:id", postController.deleteCommentPost);

module.exports = router;
