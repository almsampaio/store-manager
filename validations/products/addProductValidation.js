const schema = require('../../schemas/product');
const ProductModel = require('../../models/Products');

const validation = async (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schema.validate({ name, quantity });
  if (error) return next(error);

  const product = await ProductModel.getByName(name);
  console.log('Desafio 1', product);
  if (product) return next({ message: 'Product already exists' });

  next();
};

module.exports = validation;
