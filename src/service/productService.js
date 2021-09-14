const productModel = require('../model/productsModel');

module.exports = {
  async create(name, quantity) {
    const newProduct = await productModel.create(name, quantity);

    return newProduct;
  },
};