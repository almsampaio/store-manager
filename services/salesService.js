const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const invalidErrorMsg = 'Wrong product ID or invalid quantity';
const code = 'invalid_data';

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

async function addSales(salesList) {
  const isSaleQtyValid = await salesList.map((sale) => sale.quantity).every(quantityIsValid);
  if (!isSaleQtyValid) return { code, message: invalidErrorMsg };

  const isSaleProductValid = await Promise.all(
    salesList.map((sale) => productIsValid(sale.productId)),
  );
  if (!isSaleProductValid.every((e) => e)) return { code, message: invalidErrorMsg };

  const addedSales = await salesModel.addSales(salesList);
  return addedSales;
}

module.exports = {
  getAll,
  addSales,
};
