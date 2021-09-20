const salesModel = require('../models/salesModel');

const create = async (productSold) => salesModel.create(productSold)
  .then(({ ops }) => ops[0]);

 const getSales = async () => salesModel.getSales();

  const getSalesById = async (id) => salesModel.getSalesById(id);

  const update = async (id, productSold) => salesModel.update(id, productSold);

  const remove = async (id) => salesModel.remove(id);

  module.exports = {
  create,
  getSales,
  getSalesById,
  update,
  remove,
};