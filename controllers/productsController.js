const services = require('../services');

const createProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const newProd = await services.products.createProduct({ name, quantity });

  res.status(201).json(newProd);
};

module.exports = {
  createProduct,
};