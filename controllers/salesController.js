const salesService = require('../services/salesService');

async function getAll() {
  const sales = await salesService.getAll();
  return sales;
}

module.exports = {
  getAll,
};
