const {
  // STATUS_OK,
  // STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  // STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  STATUS_UNPROCESSABLE,
} = require('../utils/httpStatus');

const { getByName } = require('../services/productServices');

const validateName = async (req, res, next) => {
  // console.log('Middleware validateName.\n');
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(STATUS_UNPROCESSABLE).send(
      {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      },
    );
  }
  next();
};

const validateProductExistence = async (req, res, next) => {
  const { name } = req.body;
  const product = await getByName(name);
  if (product) {
    return res.status(STATUS_UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const validateQtyOfProducts = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(STATUS_UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

const validateTypeOfQty = async (req, res, next) => {
  const { quantity } = req.body;
  if (typeof (quantity) === 'string') {
    return res.status(STATUS_UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

module.exports = {
  validateName,
  validateProductExistence,
  validateQtyOfProducts,
  validateTypeOfQty,
};