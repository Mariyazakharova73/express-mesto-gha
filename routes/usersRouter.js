const router = require('express').Router(); // создали роутер
const { getUsers, createUser, getUser, updateProfile } = require('../controllers/usersController'); // данные нужны для роутинга, поэтому импортируем их

router.get('/users', getUsers );//возвращает всех пользователей
router.post("/users", createUser);//создаёт пользователя
router.get('/users/:userId', getUser );//возвращает пользователя по _id
router.patch('/users/me', updateProfile );//обновляет профиль

module.exports = router; // экспортировали роутер
