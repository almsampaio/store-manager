const ProductsService = require('../services/ProductsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { code, message, product } = await ProductsService.create(name, quantity);

  if (!product) return res.status(code).json({ message });

  res.status(code).json(product);
};

// const getAll = async (_req, res) => {
//   const products = await productsService.getAll();

//   res.status(200).json(products);
// };

module.exports = {
 create,
};