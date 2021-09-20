const ProductsService = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await ProductsService.create(name, quantity);

  if (response.err) {
    return res.status(422).json({ err: response.err });
  }

  res.status(201).json(response);
};

const getAll = async (req, res) => {
  const response = await ProductsService.getAll();

  res.status(200).json({ products: response });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.getById(id);

  if (product.err) {
    return res.status(422).json({ err: product.err });
  }

  res.status(200).json(product);
};

const setById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductsService.setById(id, name, quantity);

  if (product.err) {
    return res.status(422).json({ err: product.err });
  }

  res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  setById,
};
