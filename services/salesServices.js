const salesModel = require('../models/salesModel');
const productService = require('./productService');

const insertSale = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const findSales = await salesModel.findById(itensSold);

  if (findSales) return { status: 422, message: 'erro' };

  const product = await productService.findById(productId);
  const productQuantity = product.quantity - quantity;

  const data = { name: product.name, quantity: productQuantity };
  await productService.updateProduct(productId, data);

  const result = await salesModel.insertSale(itensSold);
  return { status: 200, data: result };
};

const findAll = async () => {
  const sales = await salesModel.findAll();

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) {
    return { err: { code: 'not_found',
      message: 'Sale not found' } };
  }

  return sale;
};

module.exports = {
  insertSale,
  findAll,
  findById,
};