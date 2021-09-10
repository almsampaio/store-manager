const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.create({ name, quantity });

  if (result.err) return res.status(422).json(result);

  return res.status(201).json(result);
};

module.exports = { create };
