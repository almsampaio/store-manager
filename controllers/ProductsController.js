const ProductsService = require('../services/ProductsService');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create(name, quantity); // Interação com o Service

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

module.exports = {
  create,
  getAll,
  getById,
};
