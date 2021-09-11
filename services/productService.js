const productModel = require('../models/productModel');

const createNewProduct = async ({ name, quantity }) => {
  const newProduct = await productModel.create({ name, quantity });

  return newProduct;
};

const getAllProducts = async () => {
  const result = await productModel.getAll();
  return result;
};

const getProductById = async (id) => {
  const result = await productModel.findById(id);
  return result;
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
};
