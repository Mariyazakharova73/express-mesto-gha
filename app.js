const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const path = require('path');
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const cardsRouter = require("./routes/cardsRouter");

const { PORT = 3000 } = process.env;

const app = express();
// пишем выше роутинга
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63413dba37e337ac09f8f2e4", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неправильный URL или метод' });
});

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
