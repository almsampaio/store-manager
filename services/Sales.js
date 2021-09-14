const salesModel = require('../models/Sales');

module.exports = {
  async create(sales) {
    const createdSales = await salesModel.create(sales);
    return createdSales;
  },
};
