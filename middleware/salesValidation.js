const STATUS = require('../util/myConst');
const validade = require('../schemas/salesSchema');
const validate = require('../schemas/productSchema');
const salesService = require('../services/salesServices');

const SalesValidate = (req, _res, next) => {
  const { body } = req;
  const { error } = validade.salesValidate.validate(body);
  if (error) {
    return next({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      statusCode: STATUS.STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

const idValidate = (req, _res, next) => {
  const { id } = req.params;
  const { error } = validate.idValidate.validate(id);

  if (error) {
    return next({
      err: { code: 'not_found', message: 'Sale not found' },
      statusCode: STATUS.STATUS_404_NOT_FOUND,
    });
  }

  next();
};

const salesAlreadyExists = async (req, _res, next) => {
  const { id } = req.params;
  const sales = await salesService.getAll();
  const idAlias = '_id';
  const sale = sales.filter((ele) => ele[idAlias].toString() === id);
  if (sale.length === 0) {
    return next({
      err: { code: 'not_found', message: 'Sale not found' },
      statusCode: STATUS.STATUS_404_NOT_FOUND,
    });
  }
  next();
};

const validateId = (req, _res, next) => {
  const { id } = req.params;
  const { error } = validate.idValidate.validate(id);

  if (error) {
    return next({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
      statusCode: STATUS.STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

module.exports = {
  SalesValidate,
  salesAlreadyExists,
  idValidate,
  validateId,
};
