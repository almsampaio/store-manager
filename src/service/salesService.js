const salesModel = require('../model/salesModel');

module.exports = {
  async create(sales) {
    const insertedSaleId = await salesModel.create(sales);

    return insertedSaleId;
  },

  async index(id) {
    if (id) {
      const product = await salesModel.find(id);

      return product;
    }

    const products = await salesModel.findAll();

    return products;
  },

  async update(id, name, quantity) {
    const updatedProduct = await salesModel.update(id, name, quantity);

    return updatedProduct;
  },

  async delete(id) {
    const deletedProduct = await salesModel.delete(id);

    return deletedProduct;
  },
};