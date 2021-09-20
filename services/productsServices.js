const ProductsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const searchedProduct = await ProductsModel.findProductByName(name);
 
  if (searchedProduct) return null;
  
  const newProduct = await ProductsModel.create(name, quantity);
  
  return newProduct;
};

module.exports = { create };