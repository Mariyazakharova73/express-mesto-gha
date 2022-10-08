const Card = require("../models/cardModel");

module.exports.getCards = (req, res) => {
  console.log('получаем карточи');
  Card.find({})
  .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createCard = (req, res) => {
  console.log('создаем карточку');
  console.log(req.user._id); // _id станет доступен
  const creatorId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: creatorId })
  .then(card => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  console.log('удаляем карточку');
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  console.log("лайк");
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  console.log("дизлайк");
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
