const productsServices = require('../services/productsServices');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await productsServices.createProduct({ name, quantity });

  if (response.message) {
    return next(response);
  }

  return res.status(201).json(response);
};

module.exports = {
  createProduct,
};
