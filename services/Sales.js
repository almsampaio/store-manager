const Sales = require('../models/Sales');
const Products = require('../models/Products');

const getAll = async () => {
  const sales = await Sales.getAll();
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await Sales.getById(id);
  const message = 'Sale not found';

  if (!sale) return { status: 404, message };
  return { status: 200, data: sale };
};

const create = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const findSales = await Sales.getByItensSold(itensSold);
  const message = 'erro';
  const err = 'Such amount is not permitted to sell';
  if (findSales) return { status: 422, message };

  const product = await Products.getById(productId);
  const resultQuantity = product.quantity - quantity;

  if (resultQuantity < 0) return { status: 404, err };
  const data = { name: product.name, quantity: resultQuantity };
  await Products.update(productId, data);

  const result = await Sales.create(itensSold);
  return { status: 200, data: result };
};

const update = async (id, itensSold) => {
  const sale = await Sales.update(id, itensSold);

  return { status: 200, data: sale };
};

const remove = async (id) => {
  const product = await Sales.getById(id);
  const message = 'Wrong sale ID format';
  if (!product) return { status: 422, message };
  console.log(product);
  const { productId, quantity } = product.itensSold[0];

  const getProduct = await Products.getById(productId);
  const resultQuantity = getProduct.quantity + quantity;
  const data = { name: getProduct.name, quantity: resultQuantity };
  await Products.update(productId, data); 

  const result = await Sales.remove(id);
  return { status: 200, data: result };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};