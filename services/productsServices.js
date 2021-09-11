const productModel = require('../models/productsModel');

const getAll = async () => {
  const AllProducts = await productModel.getAll();
  return AllProducts;
}

module.exports = {
  getAll,
}
