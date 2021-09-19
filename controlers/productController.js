const productService = require('../services/productServices');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await productService.addProduct(name, quantity);
  return res.status(status).json(result);
};

module.exports = {
  addProduct,
};