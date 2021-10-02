// const { ObjectId } = require('mongodb');

const INVALID_DATA_ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

function quantityValidation(req, _res, next) {
  const sales = [...req.body];

  sales.forEach((sale) => {
    if (sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      next({ status: 422, code: 'invalid_data', message: INVALID_DATA_ERROR_MESSAGE });
    }
  });

  next();
}

module.exports = {
  quantityValidation,
};
