const productsServices = require('../services/productsServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsServices.createProduct({ name, quantity });

  return res.status(201).json(response);
};

module.exports = {
  createProduct,
};
