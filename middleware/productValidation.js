const validate = require('../schemas/productSchema');
const productsServices = require('../services/productsServices');
require('dotenv').config();

const { env: { STATUS_422_UNPROCESSABLE } } = process;

const productValidate = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = validate.productValidate.validate({ name, quantity });

  if (error) {
    return next({
      err: { code: 'invalid_data', message: error.message },
      statusCode: STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

const idValidate = (req, _res, next) => {
  const { id } = req.params;
  const { error } = validate.idValidate.validate(id);

  if (error) {
    return next({
      err: { code: 'invalid_data', message: 'Wrong id format' },
      statusCode: STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

const alreadyExistsName = async (req, _res, next) => {
  const { name } = req.body;
  const products = await productsServices.getAll();
  const verifyProducts = products.filter((ele) => ele.name === name);
  if (verifyProducts.length > 0) {
    return next({
      err: { code: 'invalid_data', message: 'Product already exists' },
      statusCode: STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

module.exports = {
  productValidate,
  idValidate,
  alreadyExistsName,
};
