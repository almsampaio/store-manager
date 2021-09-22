const { addProduct, getAllProducts } = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await addProduct(name, quantity);

  if (products.err) return res.status(422).json({ err: products.err });

  res.status(201).json(products);
};

const getAll = async (req, res) => {
  const products = await getAllProducts();
  return products;
};

module.exports = {
  create,
  getAll,
  getById,
};
