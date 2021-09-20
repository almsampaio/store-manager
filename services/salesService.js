const salesModel = require('../models/salesModel');

const create = async (productSold) => salesModel.create(productSold)
  .then(({ ops }) => ops[0]);

 const getSales = async () => salesModel.getSales();

  const getSalesById = async (id) => salesModel.getSalesById(id);

module.exports = {
  create,
  getSales,
  getSalesById,
};