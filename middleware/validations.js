const status = require('../status');
const modelProduct = require('../models/products');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    } });
  }

  if (typeof name !== 'string') {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"name" must be a string',
    } });
  }

  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    } });
  }

  if (typeof quantity !== 'number') {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"quantity" must be a number',
    } });
  }
  next();
};

const quantityInStock = async (req, res, next) => {
  const info = req.body;
  const map = await info.map(async (e) => {
  const getBy = await modelProduct.modelGetById(e.productId);
  if (getBy.quantity - e.quantity < 0) {
    return true;
  }
  await modelProduct.modelQuantityUpdate(e.productId, -e.quantity);
  });
  Promise.all(map).then((results) => {
    if (results[0]) {
      return res.status(status.HTTP_NOT_FOUND).json({ err: { 
        code: 'stock_problem', message: 'Such amount is not permitted to sell',
      } });
    } 
  });
  next();
};

const quantitySaleValidation = (req, res, next) => {
  const sale = req.body;
  const err = { err: { 
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  } };

  sale.forEach((e) => {
    if (e.quantity <= 0 || typeof e.quantity !== 'number') {
      return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json(err);
    }
});
  next();
};

module.exports = {
  nameValidation,
  quantityValidation,
  quantitySaleValidation,
  quantityInStock,
};