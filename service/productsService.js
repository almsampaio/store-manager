const model = require('../model/productsModel');

const addNewProduct = async (newProduct) => {
  const operation = await model.addNewProduct(newProduct);
  return operation;
};

module.exports = {
    addNewProduct,
};