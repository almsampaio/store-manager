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

async function isValidId(id) {
  const saleId = await salesModel.getById(id);

  if (!saleId) return false;

  return saleId;
}

async function deleteSales(id) {
  const sale = await salesModel.deleteSales(id);

  return sale;
}

async function updateInventory({ id, quantity }) {
  const updateProduct = await salesModel.updateInventory(id, -quantity);

  updateProduct.forEach((product) => {
    if (product.quantity < 0 || product.quantity < quantity) {
      return false;
    }
  });

  return updateProduct;
}

module.exports = {
  getAllSales,
  getById,
  isValidQuantity,
  create,
  update,
  isValidId,
  deleteSales,
  updateInventory,
};