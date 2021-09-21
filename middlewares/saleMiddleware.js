const { ObjectId } = require('mongodb');
const SalesServices = require('../services/Sales');
const saleValidation = require('../validations/sales/saleValidate');

exports.saleValidate = (req, _res, next) => {
  const saleInfo = req.body;

  const validate = saleInfo
    .every(({ productId, quantity }) => saleValidation({ productId, quantity }));

  if (!validate) return next({ message: 'Wrong product ID or invalid quantity' });

  next();
};

exports.saleIdValidate = async (req, _res, next) => {
  const { id } = req.params;
  const error = { code: 'not_found', message: 'Sale not found', status: 'notFound' };

  if (!ObjectId.isValid(id)) return next(error);

  const sale = await SalesServices.getById(id);
  if (!sale) return next(error);

  req.sale = sale;

  next();
};
