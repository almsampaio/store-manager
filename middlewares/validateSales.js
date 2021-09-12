const validateItensSold = (req, res, next) => {
  const { itensSold: [{ quantity }] } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    } });
  }
  if (quantity < 1) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    } });
  }
  next();
};

module.exports = {
  validateItensSold,
};