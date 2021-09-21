const salesModel = require('../models/Sales');

const insert = async (products) => {
  const { _id, itensSold } = await salesModel.insert(products);

  return {
    _id,
    itensSold,
  };
};

const getById = async (id) => salesModel.getById(id);

const getAll = async () => salesModel.getAll();

module.exports = {
  insert,
  getById,
  getAll,
};