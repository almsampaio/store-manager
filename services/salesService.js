const salesModel = require('../models/salesModel');

const add = async (itensSold) => await salesModel.add(itensSold);

module.exports = {
  add
};
