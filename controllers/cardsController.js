const Card = require("../models/cardModel");
const { handleErrors, handleIdErrors } = require("../utils/handleErrors");

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
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => handleIdErrors(card, res))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => handleIdErrors(card, res))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => handleIdErrors(card, res))
    .catch((err) => {
      handleErrors(err, res);
    });
};
