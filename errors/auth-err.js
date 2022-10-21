const { AUTHORISATION_ERROR } = require("../utils/constants");

class AuthorisationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHORISATION_ERROR;
  }
}

module.exports = AuthorisationError;
