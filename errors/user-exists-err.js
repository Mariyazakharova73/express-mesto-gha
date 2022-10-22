const { EXISTS_ERROR } = require("../utils/constants");

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = EXISTS_ERROR;
  }
}

module.exports = UserExistsError;
