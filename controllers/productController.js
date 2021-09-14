const createService = require('../services/productService');

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const create = await createService(name, quantity);
  return res.status(create.status).json(create.message);
};
const getAllProducts = async (req, res) => {
  const create = {
    status: 200,
    message: 'testando',
  };
  return res.status(create.status).json(create.message);
};

module.exports = { createProductController, getAllProducts };