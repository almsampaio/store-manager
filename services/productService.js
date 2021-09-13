const productModel = require('../models/productModel');

const quantityEqualToOne = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ err: 
      { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });
  }
  next();
};

const quantityNumber = async (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json(
      { err: { code: 'invalid_data', message: '"quantity" must be a number' } },
);
  }
  next();
};

const nameFiveCharacter = async (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string' || name.length < 5) {
    return res.status(422).json({ err: 
      { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } });
  }
  next();
};

const ifExists = async (req, res, next) => {
  const { name } = req.body;
  const productExists = await productModel.productExists(name);
  if (productExists) { 
    return res.status(422).json(
      { err: { code: 'invalid_data', message: 'Product already exists' } },
      );
  }
  next();
};  

module.exports = {
 quantityEqualToOne,
 quantityNumber,
 nameFiveCharacter,
 ifExists,
};
