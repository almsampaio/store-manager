const Boom = require('@hapi/boom');

// Source: https://github.com/hapijs/hapi/blob/master/API.md#error-transformation
const errorSchema = (statusCode, code, message) => {
  const boomError = Boom.badRequest();
  boomError.output.statusCode = statusCode;
  boomError.reformat();
  boomError.output.payload.custom = {
    err:
      { code, message },
  };
  return boomError;
};

module.exports = errorSchema;