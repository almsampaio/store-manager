const productsService = require('../services/productsService');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { err, product } = await productsService.create(name, quantity);
  if (err) return res.status(HTTP_UNPROCESSABLE).json({ err });
  return res.status(HTTP_CREATED).json(product);
};

const getAllProducts = async (_req, res) => {
  const product = await productsService.getAllProducts();
  return res.status(HTTP_OK).json({ products: product });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (!product) {
    return res.status(HTTP_UNPROCESSABLE).json({ err:
      {
        code: 'invalid_data',
        message: 'Wrong id format' },
    });
  }
  return res.status(HTTP_OK).json(product);
};

module.exports = {
  create,
  getAllProducts,
  getProductById,
};