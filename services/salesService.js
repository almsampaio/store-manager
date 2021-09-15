const Sales = require('../models/salesModel');

const create = async (sale) => Sales.create(sale);

const getAll = async () => Sales.getAll();

module.exports = {
  create,
  getAll,
};
