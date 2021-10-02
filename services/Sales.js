const Sales = require('../models/Sales');

const serializers = require('../serializers');

async function createSales(sales) {
  const createdSales = await Sales.createSales(sales);
  return createdSales;
}

async function getSales() {
  const sales = await Sales.getSales();
  return serializers.serializeSales(sales);
}

async function getSaleById(id) {
  const sale = await Sales.getSaleById(id);
  return sale;
}

async function editSale(id, items) {
  const editedSale = await Sales.editSale(id, items);
  return editedSale;
}

async function deleteSale(id) {
  const deletedSale = await Sales.deleteSale(id);
  return deletedSale;
}

module.exports = {
  createSales,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};
