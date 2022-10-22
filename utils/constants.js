const INCORRECT_DATA_ERROR = 400;
const AUTHORISATION_ERROR = 401;
const NO_DATA_ERROR = 404;
const DEFAULT_ERROR = 500;
const EXISTS_ERROR = 409;
const LINK_CHECKING = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;

module.exports = {
  INCORRECT_DATA_ERROR,
  AUTHORISATION_ERROR,
  NO_DATA_ERROR,
  DEFAULT_ERROR,
  LINK_CHECKING,
  EXISTS_ERROR
};
