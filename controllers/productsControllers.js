const productService = require('../services/productService');

const createdNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.createNewProduct(name, quantity);

  res.status(201).json(newProduct);
};

module.exports = { 
  createdNewProduct,
};
