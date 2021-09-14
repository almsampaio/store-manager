const { unprocessableEntity } = require('../utils/httpStatus');

const errorMiddleware = (err, _req, res, _next) => {
  if (!err.code) {
    const { message } = err;
    const newMessage = message.replace(/greater/, 'larger');

    return res.status(unprocessableEntity).json({ err: { code: 'invalid_data', newMessage } });
  }
};

module.exports = errorMiddleware;
