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

  async update(id, name, quantity) {
    const updatedProduct = await productModel.update(id, name, quantity);

    return updatedProduct;
  },

  async delete(id) {
    const deletedProduct = await productModel.delete(id);

    return deletedProduct;
  },
};