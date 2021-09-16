const salesValidateQuantity = (req, res, next) => {
  req.body.forEach((sale) => {
    if (sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });
  next();
};

module.exports = {
  salesValidateQuantity,
};
