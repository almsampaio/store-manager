const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { product, message } = await productsService.create(name, quantity);
  if (message) return res.status(422).json({
    err: {
      code: "invalid_data",
      message
    }
  });

  return res.status(201).json({...product});
};

const getAll = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json({products});
}

module.exports = {
  create,
  getAll,
};
