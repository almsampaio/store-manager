const service = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  if (newProduct.err) return res.status(422).json(newProduct);

  return res.status(201).json(newProduct);
};

module.exports = {
  create,
};
