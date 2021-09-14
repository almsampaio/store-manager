const { verifyLength } = require('../schemas');

module.exports = (req, _res, next) => {
  const { name } = req.body;
  const minLength = 5;
  const message = '"name" length must be at least 5 characters long';
  const code = 'invalid_data';
  const errType = 422;

  if (typeof name !== 'string' || !verifyLength(name, minLength)) {
    return next({ err: { message, code, data: { errType } } });
  }

  return next();
};
