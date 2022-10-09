const User = require("../models/userModel");
const { handleErrors, handleIdErrors } = require("../utils/handleErrors");
const { DEFAULT_ERROR } = require("../utils/constants");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.getUser = (req, res) => {
  if (req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(req.params.userId)
      .then((user) => {
        handleIdErrors(user, res);
      })
      .catch((err) => {
        console.log(err.name);
        res
          .status(DEFAULT_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      });
    return;
  }
  res.status(400).send({ message: "Неправильный id" });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

module.exports.updateAvatar = (req, res) => {
  console.log(typeof req.body.avatar);
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};
