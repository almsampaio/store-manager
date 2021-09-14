const productModel = require('../model/productsModel');

module.exports = {
  async create(name, quantity) {
    const newProduct = await productModel.create(name, quantity);

    return newProduct;
  },

  async index(id) {
    if (id) {
      const product = await productModel.find(id);

      return product;
    }

    const products = await productModel.findAll();

    return products;
  },
};