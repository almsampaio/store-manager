const STATUS_422 = 422;

const salesQtd = (req, res, next) => {
  const sales = req.body;
  const start = 0;
  const min = 1;

  for (let i = start; i < sales.length; i += 1) {
    if (sales[i].quantity < min || typeof (sales[i].quantity) !== 'number') {
      return res.status(STATUS_422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  }

  return next();
};

module.exports = {
  salesQtd,
};
