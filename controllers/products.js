const rescue = require('express-rescue');
const { productsServices } = require('../services');
const { status } = require('../schema');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const create = await productsServices.createService(name, quantity);
  return res.status(status.status.created).json(create);
});

module.exports = {
  createProduct,
 };
