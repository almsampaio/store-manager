const salesModel = require('../model/salesModel');

module.exports = {
  async create(sales) {
    const insertedSaleId = await salesModel.create(sales);

    return insertedSaleId;
  },

  async index(id) {
    if (id) {
      const sales = await salesModel.find(id);

      return sales;
    }

    const sales = await salesModel.findAll();

    return sales;
  },

  async update(id, itensSold) {
    const updatedSale = await salesModel.update(id, itensSold);

    return updatedSale;
  },

  async delete(id) {
    const deletedSale = await salesModel.delete(id);

    return deletedSale;
  },
};