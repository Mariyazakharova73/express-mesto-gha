const User = require('../models/userModel');

module.exports.getUsers = (req, res) => {
  User.find({}).then(users => res.send(users))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}