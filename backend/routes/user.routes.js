const express = require("express");
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controllers");

const router = express.Router();

router.post("/signup", authController.signUp);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);

module.exports = router;
