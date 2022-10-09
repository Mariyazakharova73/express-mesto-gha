const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const cardsRouter = require("./routes/cardsRouter");
const { NO_DATA_ERROR } = require("./utils/constants");

const { PORT = 3000 } = process.env;

const app = express();
// пишем выше роутинга
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63413dba37e337ac09f8f2e4",
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.use("*", (req, res) => {
  res.status(NO_DATA_ERROR).send({ message: "Неправильный URL или метод" });
});

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
