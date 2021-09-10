const salesModel = require('../models/salesModel');

async function getAll() {
  const sales = await salesModel.getAll();
  return sales;
}

module.exports = {
  getAll,
};
