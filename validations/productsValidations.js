const { ObjectId } = require('mongodb');
const service = require('../service/productsService');

const validateInsertedName = async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
     } });
  }   
  return next();
};

const validateInsertedQtd = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
    } });
  }
  if (typeof quantity !== 'number') {
    return res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '"quantity" must be a number',
    } });
  } 
  return next();
};

const validateObjectID = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ err: { 
        code: 'invalid_data',
        message: 'Wrong id format',
    } });
  } 
  return next();
};

const validateExistence = async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await service.getAllProducts();
  if (allProducts.some((product) => product.name === name)) {
    return res.status(422).json({ err: { 
        code: 'invalid_data',
        message: 'Product already exists',
    } });
  }
  return next();
};

module.exports = {
    validateInsertedName,
    validateInsertedQtd,
    validateObjectID,
    validateExistence,
};