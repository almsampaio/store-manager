const service = require('../services/productsService');

const status = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

const createNewProduct = async (req, res) => {
  const { body: { name, quantity } } = req;
  const response = await service.createNewProduct(name, quantity);
  if (response.err) return res.status(status.UNPROCESSABLE_ENTITY).json({ err: response.err });
  return res.status(status.CREATED).json(response);
};

const getAllProducts = async (_req, res) => {
  try {
    const products = await service.getAllProducts();
    return res.status(status.OK).json(products);
  } catch (err) {
    return res.status(status.SERVER_ERROR).json({ errorMessage: err });
  }
};

const getProductByID = async (req, res) => {
  const { params: { id } } = req;
  const product = await service.getProductByID(id);
  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.OK).json(product);
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductByID,
};
