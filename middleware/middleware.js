const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
  return res.status(422).json({ err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' } });
  }

  if (typeof name !== 'string') {
    return res.status(422).json({ err: { code: 'invalid_data',
      message: '"name" must be a string' } });
  }

  if (typeof name !== 'string') {
    return res.status(422).json({ err: { code: 'invalid_data',
    message: '"name" must be a string' } });
  }

  next();
};

const isValidQuanty = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
  return res.status(422).json({ err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' } });
  }

  if (typeof quantity !== 'number') {
    return res.status(422).json({ err: { code: 'invalid_data',
      message: '"quantity" must be a number' } });
  }

  next();
};

const isValidSales = (req, res, next) => {
  let err = null;

  req.body.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
    if (sale.quantity <= 0) {
      err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
  });
  if (err !== null) return res.status(422).json(err);

  next();
};

module.exports = {
  isValidName,
  isValidQuanty,
  isValidSales,
};