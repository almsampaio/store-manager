const productServices = require('../services/productServices');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productServices.create(name, quantity);

  if (result.err) return res.status(422).json(result);
  res.status(201).json(result);
};

module.exports = {
  create,
};