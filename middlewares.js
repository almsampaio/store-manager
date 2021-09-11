const { ObjectId } = require('mongodb');
const productsModel = require('./models/products');

const validateProductName = async (req, res, next) => {
  const { name } = req.body;
  const findedName = await productsModel.findByName(name);
  if (name.length < 6) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    } });
  }
  if (findedName) {
    return res.status(422).json({ err: { 
      code: 'invalid_data',
      message: 'Product already exists',
     } });
  }
  next();
};

const validateProductQty = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    } });
  }
  if (quantity <= 0) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    } });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } });
  }
  next();
};

module.exports = {
  validateProductName,
  validateProductQty,
  validateId,
};