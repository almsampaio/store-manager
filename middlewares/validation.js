const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" must be a string',
      },
    });
  }
  if (name.length < 5) {
     return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

const salesValidation = async (req, res, next) => {
  const allSales = req.body;
  if (allSales.some((e) => typeof e.quantity !== 'number' || e.quantity <= 0)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  } 
  next();
};

module.exports = {
  nameValidation,
  quantityValidation,
  salesValidation,
};
