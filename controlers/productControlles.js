const prodService = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await prodService.getAll();
  return res.status(200).json(products);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await prodService.create(name, quantity);

  if (result.err) return res.status(422).json({ err: result.err });

  res.status(201).json(result);
};

module.exports = {
  getAll,
  create,
};
