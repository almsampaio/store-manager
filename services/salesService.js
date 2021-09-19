const salesModel = require('../models/salesModel');

async function getAllSales() {
  const sales = await salesModel.getAllSales();

  return sales;
}

async function getById(id) {
  const sale = await salesModel.getById(id);

  return sale;
}

function isValidQuantity(sales) {
  const salesFiltered = sales.filter((sale) => sale.quantity <= 0);
  const salesFilteredByType = sales.filter((sale) => typeof sale.quantity !== 'number');

  if (salesFiltered.length !== 0 || salesFilteredByType.length !== 0) return false;

  return true;
}

async function create(sales) {
  const sale = await salesModel.create(sales);

  return sale;
}

async function update(id, sale) {
  const toUpdate = await salesModel.updateSale(id, sale);

  return toUpdate;
}

module.exports = {
  getAllSales,
  getById,
  isValidQuantity,
  create,
  update,
};