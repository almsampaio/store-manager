const ProductsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const searchedProduct = await ProductsModel.findProductByName(name);
 
  if (searchedProduct) return null;
  
  const newProduct = await ProductsModel.create(name, quantity);
  
  return newProduct;
};

const getAll = () => ProductsModel.getAll()
  .then((result) => result);

module.exports = { create, getAll };