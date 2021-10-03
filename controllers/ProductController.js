const ProductModel = require('../models/Product');
const ProductService = require('../services/Product');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService.create({ name, quantity });

  if (!product) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  res.status(201).json({ message: 'Produto criado com sucesso!' });
};

const getAll = async (req, res) => {
  const products = await ProductModel.getAll();
  return res.status(200).json(products);
};

module.exports = {
  getAll,
  create,
};
