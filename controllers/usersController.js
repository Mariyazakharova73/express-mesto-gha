const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const NotFoundError = require("../errors/not-found-err");
const AuthorisationError = require("../errors/auth-err");
const IncorrectDataError = require("../errors/incorrect-data-err");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      // вернём токен
      res.send({ token });
    })
    .catch((e) => {
      // ошибка аутентификации
      // res.status(401).send({ message: err.message });
      const err = new AuthorisationError("Ошибка аутентификации");
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  // хешируем пароль
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send(user))
    .catch((e) => {
      const err = new IncorrectDataError("Переданы некорректные данные при создании пользователя");
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(user);
    })
    .catch(next);
  // .catch((err) => {
  //   handleErrors(err, res);
  // });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(user);
    })
    .catch(next);
  // .catch((err) => {
  //   handleErrors(err, res);
  // });
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      const err = new IncorrectDataError("Переданы некорректные данные при обновлении профиля");
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      const err = new IncorrectDataError("Переданы некорректные данные при обновлении аватара");
      next(err);
    });
};
