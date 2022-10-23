const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');
const { createUser, login } = require('./controllers/usersController');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

const { validateLogin, validateUser } = require('./utils/validation');

const { PORT = 3000 } = process.env;
const app = express();
// пишем выше роутинга
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use(auth, usersRouter);
app.use(auth, cardsRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Неправильный URL или метод'));
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(errors()); // обработчик ошибок celebrate

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
