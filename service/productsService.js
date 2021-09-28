const model = require('../model/productsModel');

const addNewProduct = async (newProduct) => {
  const operation = await model.addNewProduct(newProduct);
  return operation;
};

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return products;
};

const getById = async (id) => {
  const product = await model.getById(id);
  return product;
};

module.exports = {
    addNewProduct,
    getAllProducts,
    getById,
};