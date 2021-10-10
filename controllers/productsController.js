const productsService = require('../services/productsService');

const HTTP_200 = 200;
const HTTP_201 = 201;
const HTTP_422 = 422;

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(HTTP_200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (!product) {
    return res.status(HTTP_422).json({ err:
      { code: 'invalid_data', message: 'Wrong id format' } });
  }
  return res.status(HTTP_200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { err, product } = await productsService.create(name, quantity);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_201).json(product);
};

const editById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { err, product } = await productsService.editById(id, name, quantity);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(product);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (!product) {
    return res.status(HTTP_422).json({ err:
      { code: 'invalid_data', message: 'Wrong id format' } });
  }
  await productsService.deleteById(id);
  return res.status(HTTP_200).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
