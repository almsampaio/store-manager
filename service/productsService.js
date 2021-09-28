const model = require('../model/productsModel');

const addNewProduct = async (newProduct) => {
  const operation = await model.addNewProduct(newProduct);
  return operation;
};

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return products;
};

module.exports = {
    addNewProduct,
    getAllProducts,
};