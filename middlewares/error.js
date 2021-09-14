const { unprocessableEntity } = require('../utils/httpStatus');

const errorMiddleware = (err, _req, res, _next) => {
  const { message } = err;
  const newMessage = message.replace(/greater/, 'larger');

  return res.status(unprocessableEntity)
    .json({ err: { code: 'invalid_data', message: newMessage } });
};

module.exports = errorMiddleware;
