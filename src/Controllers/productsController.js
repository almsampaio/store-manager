const productsService = require('../Services/productsService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_UNPROCESSABLE = 422;

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(HTTP_STATUS_OK).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);
  if (product.err) {
    return res.status(HTTP_STATUS_UNPROCESSABLE).json(product);
  }
  return res.status(HTTP_STATUS_OK).json(product);
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
   
  const product = await productsService.addProduct(name, quantity);
  if (product.err) {
    return res.status(HTTP_STATUS_UNPROCESSABLE).json(product);
  }

 return res.status(HTTP_STATUS_CREATED).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};