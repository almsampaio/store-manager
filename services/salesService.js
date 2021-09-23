const salesModel = require('../models/salesModel');

const add = async (itensSold) => salesModel.add(itensSold);

const getAll = async () => salesModel.getAll()
  .then((sales) => ({ sales }));

const getById = async (id) => salesModel.getById(id); 

module.exports = {
  add,
  getAll,
  getById,
};
