const router = require("express").Router();
const {
  getUsers,
  createUser,
  updateProfile,
  getUser,
  getUserMe,
} = require("../controllers/usersController");
const {
  validateUser, validateUserId, validateUserInfo,
} = require("../utils/validation");

router.get("/users", getUsers);
router.post("/users", validateUser, createUser);
router.get("/users/me", getUserMe);
router.get("/users/:userId", validateUserId, getUser);
router.patch("/users/me", validateUserInfo, updateProfile);
router.patch("/users/me/avatar", validateUserInfo, updateProfile);

module.exports = router;
