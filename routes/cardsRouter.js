const router = require("express").Router(); // создали роутер
const {
  createCard,
  getCards,
  deleteCard,
} = require("../controllers/cardsController"); // данные нужны для роутинга, поэтому импортируем их

router.get("/cards", getCards); //возвращает все карточки
router.post("/cards", createCard); //создаёт карточку
router.delete("/cards/:cardId", deleteCard); //удаляет карточку по идентификатору

module.exports = router; // экспортировали роутер
