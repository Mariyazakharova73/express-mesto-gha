module.exports.handleErrors = (err, res) => {
  if (err.name == "CastError") {
    return res.status(404).send({ message: "Объект не найден" });
  }
  if (err.name == "ValidationError") {
    return res.status(400).send({ message: "Переданы некорректные данные" });
  }
  res.status(500).send({ message: "На сервере произошла ошибка" });
};
