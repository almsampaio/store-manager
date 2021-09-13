const createService = require('../services/productService');

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const create = await createService(name, quantity);
  return res.status(create.status).json(create.message);
};

module.exports = createProductController;