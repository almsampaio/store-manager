const productsService = require('../services/productsService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const getAll = async (_req, res) => {
  console.log('controoler');
  const products = await productsService.getAll();
  res.status(OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (!product.err) {
    res.status(OK).json(product);
  }
  return res.status(UNPROCESSABLE_ENTITY).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.create(name, quantity);

  if (!product.err) {
    return res.status(CREATED).json(product);
  }

  return res.status(UNPROCESSABLE_ENTITY).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.updateProduct(id, name, quantity);
  if (!product.err) {
    return res.status(OK).json(product);
  }
  return res.status(UNPROCESSABLE_ENTITY).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.deleteProduct(id);
  if (!product.err) {
    return res.status(OK).json({
      _id: id,
      name,
      quantity,
    });
  }
  return res.status(UNPROCESSABLE_ENTITY).json(product);
};

module.exports = { getAll, create, getById, updateProduct, deleteProduct };
