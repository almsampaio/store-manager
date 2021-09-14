const Sales = require('../models/salesModel');

const create = async (sale) => Sales.create(sale);

module.exports = {
  create,
};
