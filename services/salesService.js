const salesModel = require('../models/salesModel');

const add = async (itensSold) => salesModel.add(itensSold);

const getAll = async () => await salesModel.getAll()
  .then((sales) => ({ sales }));

const getById = async (id) => await salesModel.getById(id); 

module.exports = {
  add,
  getAll,
  getById,
};
