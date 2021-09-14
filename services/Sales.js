const Sale = require('../models/Sale');

const create = async (sales) => Sale.create(sales);

module.exports = {
  create,
};