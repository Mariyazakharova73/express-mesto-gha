const User = require("../models/userModel");
const { handleErrors } = require("../controllers/handleErrors");

module.exports.getUsers = (req, res) => {
  console.log("получаем пользователей");
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  console.log("создаем пользователя");
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.getUser = (req, res) => {
  console.log("получаем пользователя");
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.updateProfile = (req, res) => {
  console.log("редактируем профиль");
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

module.exports.updateAvatar = (req, res) => {
  console.log("редактируем аватар");
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};
