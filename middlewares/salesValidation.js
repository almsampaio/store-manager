const HTTP_UNPROCESSABLE_STATUS = 422;

const validQuantity = (req, res, next) => {
  let error = null;

  req.body.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      error = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
    if (sale.quantity <= 0) {
      error = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
  });
  if (error !== null) return res.status(HTTP_UNPROCESSABLE_STATUS).json(error);

  next();
};

module.exports = {
  validQuantity,
};
