const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const AuthorisationError = require("../errors/auth-err");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      // this — это модель User
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(
          new AuthorisationError("Неправильные почта или пароль"),
        );
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorisationError("Неправильные почта или пароль"),
          );
        }
        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model("user", userSchema);
