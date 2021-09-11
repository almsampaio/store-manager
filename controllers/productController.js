const productService = require('../services/productService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPR_ENTRY_STATUS = 422;

const getAll = async (_req, res) => {
  const allProducts = await productService.listProducts();
  res.status(HTTP_OK_STATUS).json({ products: allProducts });
};

const getById = async (req, res) => {
  const { product, errorMessage } = await productService.getById(req.params.id);

  if (errorMessage) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage);
  }

  if (product) {
    return res.status(HTTP_OK_STATUS).json(product);
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, createdProduct } = await productService.create(name, quantity);

  if (errorMessage) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage);
  }

  res.status(HTTP_CREATED_STATUS).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const errorMessage = await productService.update(id, name, quantity);

  if (errorMessage) {
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage.errorMessage);
  }
  return res.status(HTTP_OK_STATUS).json({ _id: id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { errorMessage, product } = await productService.getById(id);

  if (errorMessage) {
    console.log('ola');
    return res.status(HTTP_UNPR_ENTRY_STATUS).json(errorMessage);
  }

  await productService.deleteProduct(id);

  res.status(HTTP_OK_STATUS).json(product);
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
