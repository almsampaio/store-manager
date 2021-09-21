const salesModel = require('../models/sales');
const productModel = require('../models/products');

async function getAll() {
  const sales = await salesModel.getAll();
  return { status: 200, data: sales };
}

async function getById(id) {
  const sale = await salesModel.getById(id);
  return sale;
}

async function create(itensSold) {
  const { productId, quantity } = itensSold[0];
  const find = await salesModel.getByItemSold(itensSold);
  if (find) return { status: 422, message: 'erro' };

  const product = await productModel.getById(productId);
  const resultQuantity = product.quantity - quantity;

  if (resultQuantity < 0) return { status: 422, message: 'Such amount is not permitted to sell' };
  const data = { name: product.name, quantity: resultQuantity };
  await productModel.updateProduct(productId, data);
  const result = await salesModel.create(itensSold);
  return { status: 200, data: result };
}

const update = async (id, itensSold) => {
  const sale = await salesModel.update(id, itensSold);
  return { status: 200, data: sale };
};

const deleteSale = async (id) => {
  const sale = await salesModel.deleteSale(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};