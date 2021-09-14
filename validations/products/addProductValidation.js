const schema = require('../../schemas/product');
const ProductModel = require('../../models/Products');

const productAlreadyExists = async (productName) => ProductModel.getByName(productName);

const validation = async (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schema.validate({ name, quantity });
  if (error) return next(error);

  const alreadyExists = productAlreadyExists(name);
  if (alreadyExists) return next({ message: 'Product already exists' });

  next();
};

module.exports = validation;
