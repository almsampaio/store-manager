const salesModel = require('../models/salesModel');

const add = async (itensSold) => salesModel.add(itensSold);

module.exports = {
  add,
};
