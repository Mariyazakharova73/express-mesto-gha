const Card = require("../models/cardModel");
const NotFoundError = require("../errors/not-found-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const creatorId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: creatorId })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove({ _id: req.params.cardId, owner: req.user })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с таким id");
      }
      res.send(card);
    })
    .catch(next);
};
