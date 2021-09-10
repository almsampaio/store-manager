const httpStatus = require('../utils/httpStatus');
const productModel = require('../models/productModel');

const validateName = async (req, res, next) => {
  const { name } = req.body;

  const FIVE = 5;

  if (name.length < FIVE) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(
      { err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      } },
    );
  }

  next();
};

const validateProductExists = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.findByName(name);

  if (product) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  next();
};

const validateQuantityGreaterThanZero = (req, res, next) => {
  const { quantity } = req.body;

  const ZERO = 0;

  if (quantity <= ZERO) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

const validateQuantityisNumber = (req, res, next) => {
  const { quantity } = req.body;

  if (typeof (quantity) === 'string') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  next();
};

const validateProductIdExists = async (req, res, next) => {
  const { id } = req.params;
  const productExists = await productModel.getById(id);
  if (!productExists) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = {
  validateName,
  validateProductExists,
  validateQuantityGreaterThanZero,
  validateQuantityisNumber,
  validateProductIdExists,
};