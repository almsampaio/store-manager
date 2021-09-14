const ProductsService = require('../services/ProductsService');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create(name, quantity);

  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(product);
  }

  return res.status(CREATED_STATUS).json(product);
};

const getAll = async (_req, res) => {
  const productsList = await ProductsService.getAll();

  return res.status(OK_STATUS).json({ products: productsList });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.getById(id);

  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(product);
  }

  return res.status(OK_STATUS).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await ProductsService.update(id, name, quantity);

  if (updatedProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(updatedProduct);
  }

  return res.status(OK_STATUS).json(updatedProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const removedProduct = await ProductsService.remove(id);

  if (removedProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(removedProduct);
  }

  return res.status(OK_STATUS).json(removedProduct);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
