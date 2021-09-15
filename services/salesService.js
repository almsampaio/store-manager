const Sales = require('../models/salesModel');

const getAll = async () => Sales.getAll();

const create = async (sale) => Sales.create(sale);

module.exports = {
  getAll,
  create,
};
