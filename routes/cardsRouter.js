const router = require("express").Router(); // создали роутер
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardsController"); // данные нужны для роутинга, поэтому импортируем их

router.get("/cards", getCards); //возвращает все карточки
router.post("/cards", createCard); //создаёт карточку
router.delete("/cards/:cardId", deleteCard); //удаляет карточку по идентификатору
router.put("/cards/:cardId/likes", likeCard); //поставить лайк карточке
router.delete("/cards/:cardId/likes", dislikeCard); //убрать лайк с карточки

module.exports = router; // экспортировали роутер
