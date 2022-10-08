const Card = require('../models/cardModel');

module.exports.getCards = (req, res) => {
  Card.find({}).then(cards => res.send(cards))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  Card.create({ name, link });
};

module.exports.deleteCard = (req, res) => {
  console.log(req.params.cardId)
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

