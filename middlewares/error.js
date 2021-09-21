const httpStatus = require('../utils/httpStatus');

const errorMiddleware = (err, _req, res, _next) => {
  const { 
  code = 'invalid_data', 
  message = '', 
  status = 'unprocessableEntity', 
} = err;

  const newMessage = message.replace(/greater/, 'larger');

  return res.status(httpStatus[status])
    .json({ err: { code, message: newMessage } });
};

module.exports = errorMiddleware;
