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

module.exports = {
  create,
  getAll,
};
