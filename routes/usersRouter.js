const router = require("express").Router(); // создали роутер
const {
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  getUser,
  getUserMe,
} = require("../controllers/usersController"); // данные нужны для роутинга, поэтому импортируем их

router.get("/users", getUsers); // возвращает всех пользователей
router.post("/users", createUser); // создаёт пользователя
router.get("/users/me", getUserMe);
router.get("/users/:userId", getUser); // возвращает пользователя по _id
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router; // экспортировали роутер
