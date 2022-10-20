const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const cardsRouter = require("./routes/cardsRouter");
const { createUser, login } = require("./controllers/usersController");
const auth = require("./middlewares/auth");
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
app.post("/signup", createUser);
// авторизация
// app.use(auth);
app.use(auth, usersRouter);
app.use(auth, cardsRouter);
app.use("*", (req, res) => {
  res.status(NO_DATA_ERROR).send({ message: "Неправильный URL или метод" });
});

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
