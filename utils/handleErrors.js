const {
  INCORRECT_DATA_ERROR,
  NO_DATA_ERROR,
  DEFAULT_ERROR,
} = require("./constants");

module.exports.handleErrors = (err, res) => {
  if (err.name == "CastError") {
    return res.status(NO_DATA_ERROR).send({ message: "Объект не найден" });
  }
  if (err.name == "ValidationError") {
    return res
      .status(INCORRECT_DATA_ERROR)
      .send({ message: "Переданы некорректные данные" });
  }
  res.status(DEFAULT_ERROR).send({ message: "На сервере произошла ошибка" });
};

module.exports.checkId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};

module.exports.handleIdErrors = (obj, res) => {
  if (!obj) {
    res.status(NO_DATA_ERROR).send({ message: "Объект не найден" });
    return;
  }
  res.send(obj);
};
