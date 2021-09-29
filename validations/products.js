const { ObjectId } = require('mongodb');
const service = require('../service/productsService');

const validateInsertedName = async (req, res, next) => {
    const { name } = req.body;
    const allProducts = await service.getAllProducts();
    if (name.length < 5) {
      res.status(422).json({ err: { 
          code: 'invalid_data',
          message: '\'name\' length must be at least 5 characters long',
       } });
    }
    if (allProducts.some((product) => product.name === name)) {
      res.status(422).json({ err: { 
          code: 'invalid_data',
          message: 'Product already exists',
      } });
    }
    next();
};

const validateInsertedQtd = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '\'quantity\' must be larger than or equal to 1',
    } });
  }
  if (typeof quantity !== 'number') {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '\'quantity\' must be a number',
    } });
  }
  next();
};

const validateObjectID = async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await service.getAllProducts();
  if (!ObjectId.isValid(id)) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: 'Wrong id format',
    } });
  }
  if (!allProducts.some((product) => product.id === ObjectId(id))) {
    res.status(422).json({ err: { 
      code: 'invalid_data',
      message: 'Wrong id format',
  } });
  }
  next();
};

module.exports = {
    validateInsertedName,
    validateInsertedQtd,
    validateObjectID,
};