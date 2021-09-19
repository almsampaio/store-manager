const HTTP_UNPROCESSABLE_ENTITY = 422;
const INVALID_DATA = 'invalid_data';

const WRONG_PRODUCT_ID_QUANTITY = 'Wrong product ID or invalid quantity';

const validSalesQuantity = (req, res, next) => {
  let error = null;

  req.body.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      error = { err: { code: INVALID_DATA, message: WRONG_PRODUCT_ID_QUANTITY } };
    }
    if (sale.quantity <= 0) {
      error = { err: { code: INVALID_DATA, message: WRONG_PRODUCT_ID_QUANTITY } };
    }
  });
  if (error !== null) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(error);

  next();
};

module.exports = {
  validSalesQuantity,
};
