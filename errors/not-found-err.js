const { NO_DATA_ERROR } = require("../utils/constants");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NO_DATA_ERROR;
  }
}

module.exports = NotFoundError;
