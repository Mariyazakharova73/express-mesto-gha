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

app.get("/", (req, res) => {
  res.send(
    `<html>
        <body>
            <p>Сервер работай!!!!!!!</p>
        </body>
        </html>`
  );
});

app.use((req, res, next) => {
  req.user = {
    _id: "63404f320f0c315be1d249fd", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/", usersRouter); // начало URL — роутер будет запускаться только для запросов, начинающихся с этой строки
app.use("/", cardsRouter);

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
