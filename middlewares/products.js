const { productsServices } = require('../services');
const { message, status, code } = require('../messages');

const checkProductName = async (req, res, next) => {
  const { name } = req.body;
  const MIN_LENGTH = 5;

  if (name.length < MIN_LENGTH) {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.nameShort },
    });
  }

  next();
};

const checkProductExist = async (req, res, next) => {
  const { name } = req.body;
  const findName = await productsServices.findName(name);

  if (findName) {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.productExist },
    });
  }

  next();
};

const checkProductQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const MIN_QUANTITY = 0;

  if (quantity <= MIN_QUANTITY) {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.atLeastOneProduct },
    });
  }

  next();
};

const checkTypeQuantity = (req, res, next) => {
  const { quantity } = req.body;
  
  if (typeof quantity === 'string') {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.quantityNotNumber },
    });
  }

  next();
};

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const idLength = 24;
  
    if (!id || id.length !== idLength) {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.idNotFound },
    });
  }

  next();
};

const createProducts = [
  checkProductName, 
  checkProductExist,
  checkTypeQuantity,
  checkProductQuantity,
];

const updateProducts = [
  checkProductName,
  checkProductQuantity,
  checkTypeQuantity,
];

module.exports = {
  createProducts,
  checkId,
  updateProducts,
};
