const productService = require('../services/products');

const addNew = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.addNew({ name, quantity });

  if (newProduct.message) return next(newProduct);
  return res.status(201).json(newProduct);
};

module.exports = {
  addNew,
};
