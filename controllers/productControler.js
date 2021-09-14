const productModel = require('../models/productModel');
const productService = require('../services/productService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_BODY_STATUS = 422;
// const HTTP_401 = 401;
// const HTTP_NOT_FOUND_STATUS = 404;

const validatedNameAndQuantity = async (req, res) => {
  const { name, quantity } = req.body;
  const created = await productModel.createUser(name, quantity);
  // console.log(created);
  return res.status(HTTP_CREATED_STATUS).json(created);
};

const getAllProducts = async (_req, res) => {
  const products = await productModel.getAllProducts();
  res.status(HTTP_OK_STATUS).json({ products });
};

const validateId = async (req, res) => {
  const { id } = req.params;
  const validatedId = await productService.validId(id);
  if (!validatedId) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  return res.status(HTTP_OK_STATUS).json(validatedId);
};

const updateUi = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await productModel.updateProduct(id, { name, quantity });
  return res.status(HTTP_OK_STATUS).json({ _id: id, name, quantity });
};
module.exports = {
  validatedNameAndQuantity,
  getAllProducts,
  validateId,
  updateUi,
};