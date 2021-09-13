const { ObjectId } = require('mongodb');
const productService = require('../service/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
    const { err, data } = await productService.create(name, quantity);
    if (err) return res.status(422).json({ err });
    return res.status(201).json(data);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  return res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } }); 
  }
  const product = await productService.getById(id);

  return res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
};
