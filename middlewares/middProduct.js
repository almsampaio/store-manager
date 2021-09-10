const STATUS_422 = 422;
const minChar = 5;
const minQtd = 0;

const productName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < minChar) {
    return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  return next();
};

const productQtd = (req, res, next) => {
  const qtd = req.body.quantity;

  if (typeof (qtd) !== 'number') {
    return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (qtd <= minQtd || qtd % 1 !== minQtd) {
    return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  return next();
};

module.exports = { productName, productQtd };
