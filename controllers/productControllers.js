const productServices = require('../services/productServices');
const { 
  STATUS_OK,
  STATUS_CREATE,
  STATUS_UNPROCESSABLE,
} = require('../utils/httpStatus');

const getAll = async (_req, res) => {
  const products = await productServices.getAllProducts();
  return res.status(STATUS_OK).send({ products });
};

const createProduct = async (req, res) => {
  console.log('Controller createProduct()!');
  const { name, quantity } = req.body;
  const product = await productServices.create(name, quantity);
  return res.status(STATUS_CREATE).send(product);
};

const getById = async (req, res) => {
  console.log('Controller getById()!');
  const { id } = req.params;
  const product = await productServices.getById(id);
  if (!product) { // se o id for inválido o model retornará null p/ service, que retornará para cá (controller).
    return res.status(STATUS_UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(STATUS_OK).send(product);
};

module.exports = {
  getAll,
  createProduct,
  getById,
};