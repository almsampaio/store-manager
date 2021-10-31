const ProductModel = require('../models/Product');
const ProductService = require('../services/Product');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { status, json } = await ProductService.create({ name, quantity });

  return res.status(status).json(json);
};

const getAll = async (req, res) => {
  const products = await ProductModel.getAll();
  return res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.getById(id);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  return res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { status, json } = await ProductService.update({ id, name, quantity });

  return res.status(status).json(json);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await ProductModel.deleteById(id);

  if (!deletedProduct) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

  return res.status(200).json(deletedProduct);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
