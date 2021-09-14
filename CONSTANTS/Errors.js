const {
  STATUS_INTERNAL_SERVER_ERROR,
} = require('./httpStatusCode');

const mongoError = {
  err: {
    code: 'Internal Database Error',
    message: 'Sorry about that, please contact us if you find this, we respond immediatly',
  },
  statusCode: STATUS_INTERNAL_SERVER_ERROR,
};

module.exports = {
  mongoError,
};
