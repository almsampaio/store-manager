const salesModel = require('../models/salesModel');

const create = async (itensSold) =>
  salesModel.create(itensSold).then(({ ops }) => ops[0]);

const findSales = async () => salesModel.findSales();

module.exports = { create, findSales };
