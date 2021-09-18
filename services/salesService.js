const salesModel = require('../models/salesModel');

const create = async (productSold) => salesModel.create(productSold)
  .then(({ ops }) => ops[0]);

 const getSales = async () => salesModel.getSales();

module.exports = {
  create,
  getSales,
};