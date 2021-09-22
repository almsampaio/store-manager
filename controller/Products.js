const { addProduct, getAll } = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await addProduct(name, quantity);

  if (products.err) return res.status(422).json({ err: products.err });

  res.status(201).json(products);
};

const getAllProducts = async (_req, res) => {
  const products = await getAll();
  res.status(200).json({ products });
};

module.exports = {
  create,
  getAllProducts,
  // getById,
};
