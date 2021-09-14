const httpStatus = require('../utils/httpStatus');
const productModel = require('../models/productModel');
const salesModel = require('../models/salesModel');

// dados que vem no body, token do header --> utilização do middleware

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

const validateSaleExists = async (req, res, next) => {
  const { id } = req.params;

  const saleExists = await salesModel.getById(id);

  if (!saleExists) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  next();
};

const validateSoldProductQuantity = (req, res, next) => {
  const sales = req.body;
  const ZERO = 0;

  sales.forEach(({ quantity }) => {
    if (quantity <= ZERO || typeof quantity !== 'number') {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });

  // return res.status(httpStatus.HTTP_OK_STATUS).json({ message: 'ok' });
  next();
};

const validateItemsSoldArray = (req, res, next) => {
  const sales = req.body;

  if (!sales || sales === null || sales === undefined) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Invalid data. ItensSold cannot be empty',
      },
    });
  }
  next();
};

// const validate
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

module.exports = {
  validateName,
  validateProductExists,
  validateQuantityGreaterThanZero,
  validateQuantityisNumber,
  validateProductIdExists,
  validateSoldProductQuantity,
  validateItemsSoldArray,
  validateSaleExists,
};