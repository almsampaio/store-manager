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

  if (productQuantity < 0) {
    return { status: 404,
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    };
  }

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

const updateSale = async (id, itensSold) => {
  const edited = await salesModel.updateSale(id, itensSold);
  return edited;
};

module.exports = {
  insertSale,
  findAll,
  findById,
  updateSale,
};