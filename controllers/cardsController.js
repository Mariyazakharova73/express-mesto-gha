const Card = require("../models/cardModel");
const { handleErrors } = require("../utils/handleErrors");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

module.exports.createCard = (req, res) => {
  const creatorId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: creatorId })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId.match(/^[0-9a-fA-F]{24}$/)) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send({ data: card }))
      .catch((err) => {
        res.status(500).send({ message: "На сервере произошла ошибка" });
      });
  }
  res.status(400).send({ message: "Неправильный id" });
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId.match(/^[0-9a-fA-F]{24}$/)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    )
      .then((card) => res.send({ data: card }))
      .catch((err) => {
        res.status(500).send({ message: "На сервере произошла ошибка" });
      });
  }
  res.status(400).send({ message: "Неправильный id" });
};

module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.match(/^[0-9a-fA-F]{24}$/)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }
    )
      .then((card) => res.send({ data: card }))
      .catch((err) => {
        res.status(500).send({ message: "На сервере произошла ошибка" });
      });
  }
  res.status(400).send({ message: "Неправильный id" });
};
