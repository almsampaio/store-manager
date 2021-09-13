const productModel = require('../models/productModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_BODY_STATUS = 422;
// const HTTP_401 = 401;
// const HTTP_NOT_FOUND_STATUS = 404;

const validatedNameAndQuantity = async (req, res) => {
  const { name, quantity } = req.body;
  const created = await productModel.createUser(name, quantity);
  console.log(created);
  return res.status(HTTP_CREATED_STATUS).json(created);
};
const getAllProducts = async (_req, res) => {
  const products = await productModel.getAllProducts();
  res.status(HTTP_OK_STATUS).json({ products });
};

module.exports = {
  validatedNameAndQuantity,
  getAllProducts,
};