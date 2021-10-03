const Service = require('../services');
const { HTTP_UNPROCESSABLE_ENTITY, 
  HTTP_CREATED_STATUS, HTTP_OK_STATUS } = require('../httpRequests');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Service.products.addProduct({
    name,
    quantity,
  });

  if (product.err) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(product);

  res.status(HTTP_CREATED_STATUS).json(product);
};

const getProducts = async (_req, res) => {
  const products = await Service.products.getProducts();

  res.status(HTTP_OK_STATUS).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Service.products.getProductById(id);

  if (product.err) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(product);

  res.status(HTTP_OK_STATUS).json(product);
};

const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await Service.products.productUpdate(id, {
    name,
    quantity,
  });

  if (product.err) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(product);

  res.status(HTTP_OK_STATUS).json(product);
};

const productDelete = async (req, res) => {
  const { id } = req.params;

  const product = await Service.products.productDelete(id);

  if (product.err) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(product);

  res.status(HTTP_OK_STATUS).json(product);
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  productUpdate,
  productDelete,
};