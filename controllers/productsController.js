const productsServices = require('../services/productsServices');
require('dotenv').config();

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(process.env.STATUS_200_OK).json({ products });
}

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);
  return res.status(process.env.STATUS_200_OK).json(product);
}

const create = async (req, res) => {
  const  { name, quantity } = req.body;
  const createdProduct = await productsServices.create(name, quantity);
  console.log(createdProduct);
  return res.status(process.env.STATUS_201_CREATED).json(createdProduct)
}

module.exports = {
  getAll,
  getById,
  create,
}
