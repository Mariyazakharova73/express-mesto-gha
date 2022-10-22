const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const cardsRouter = require("./routes/cardsRouter");
const { createUser, login } = require("./controllers/usersController");
const auth = require("./middlewares/auth");
const { errors } = require("celebrate");
const { celebrate, Joi } = require("celebrate");

// const validator = require("validator");
const { NO_DATA_ERROR } = require("./utils/constants");

const { PORT = 3000 } = process.env;

const app = express();
// пишем выше роутинга
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post("/signin", login);
app.post("/signup", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string()
      .required()
      .pattern(
        /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/,
      ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
// авторизация
// app.use(auth);
app.use(auth, usersRouter);
app.use(auth, cardsRouter);
app.use("*", (req, res) => {
  res.status(NO_DATA_ERROR).send({ message: "Неправильный URL или метод" });
});

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
