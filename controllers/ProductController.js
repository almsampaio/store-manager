const ProductModel = require('../models/Product');
const ProductService = require('../services/Product');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { status, json } = await ProductService.create({ name, quantity });

  return res.status(status).json(json);
};

const getAll = async (req, res) => {
  const products = await ProductModel.getAll();
  return res.status(200).json(products);
};

module.exports = {
  getAll,
  create,
};
