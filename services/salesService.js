const salesModel = require('../models/salesModel');

const create = async (itensSold) =>
  salesModel.create(itensSold).then(({ ops }) => ops[0]);

const findSales = async () => salesModel.findSales();

const findById = async (id) => salesModel.findById(id);

const update = async (id, itensSold) => salesModel.update(id, itensSold);

const deleteSold = async (id) => salesModel.deleteSold(id);

module.exports = { create, findSales, findById, update, deleteSold };
