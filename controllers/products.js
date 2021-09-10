const productServices = require('../services/products');

const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_422 = 422;

const postProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProd = await productServices.postProduct(name, quantity);

  if (newProd !== null) {
    return res.status(STATUS_201).json(newProd);
  }

  return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  });
};

const getAllProducts = async (_req, res) => {
  const products = await productServices.getAllProducts();

  return res.status(STATUS_200).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const prod = await productServices.getProductById(id);

  if (prod !== null) {
    return res.status(STATUS_200).send(prod);
  }

  return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const prod = await productServices.putProduct(id, name, quantity);

  if (prod !== null) {
    return res.status(STATUS_200).send(prod);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.deleteProduct(id);

  if (product !== null) {
    return res.status(STATUS_200).send(product);
  }

  return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
