const express = require("express");
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controllers");
const { uploadAvatar } = require("../middleware/multer.middlewares");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/signout", authController.signOut);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", uploadAvatar, userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);

module.exports = router;
