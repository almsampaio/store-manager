const { ObjectId } = require('mongodb');

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res
      .status(422)
      .json({ err: { message: 'Wrong sale ID format', code: 'invalid_data' } });
  }
  next();
};
