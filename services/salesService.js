const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const invalidErrorMsg = 'Wrong product ID or invalid quantity';
const notFoundErrorMsg = 'Sale not found';
const invalidCode = 'invalid_data';
const notFoundCode = 'not_found';

function quantityIsValid(quantity) {
  const isNumber = typeof quantity === 'number';
  const isValid = quantity > 0;

  if (!isNumber || !isValid) return false;
  return true;
}

async function productIsValid(productId) {
  const product = await productsModel.getById(productId);

  if (!product) return false;
  return true;
}

async function getAll() {
  const sales = await salesModel.getAll();
  return sales;
}

async function getById(id) {
  const saleById = await salesModel.getById(id);

  if (!saleById) return { code: notFoundCode, message: notFoundErrorMsg };

  return saleById;
}

async function addSales(salesList) {
  const isSaleQtyValid = await salesList.map((sale) => sale.quantity).every(quantityIsValid);
  if (!isSaleQtyValid) return { code: invalidCode, message: invalidErrorMsg };

  const isSaleProductValid = await Promise.all(
    salesList.map((sale) => productIsValid(sale.productId)),
  );
  if (!isSaleProductValid.every((e) => e)) return { code: invalidCode, message: invalidErrorMsg };

  const addedSales = await salesModel.addSales(salesList);
  return addedSales;
}

module.exports = {
  getAll,
  getById,
  addSales,
};
