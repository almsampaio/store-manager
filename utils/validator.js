const { ObjectID } = require('mongodb');
const products = require('../models/productModel');
const sales = require('../models/salesModel');

const err = (code, message) => ({ code, message });

const product = async ({ name, quantity }) => {
  const min = 5;
  let message;
  if (name.length < min) message = '"name" length must be at least 5 characters long';
  if (typeof (quantity) !== 'number') message = '"quantity" must be a number';
  if (quantity < 1) message = '"quantity" must be larger than or equal to 1';
  if (message) throw err('invalid_data', message);
};

const productExists = async ({ name }) => {
  const exists = await products.getByName(name);
  if (exists) throw err('invalid_data', 'Product already exists');
};

const productId = async (id) => {
  if (!ObjectID.isValid(id)) throw err('invalid_data', 'Wrong id format');
};

const sale = async (itensSold) => {
  const minLength = 0;
  const isValid = itensSold.every(({ quantity }) =>
    (typeof (quantity) === 'number' && quantity > minLength));
  if (!isValid) throw err('invalid_data', 'Wrong product ID or invalid quantity');
};

const saleExists = async (id) => {
  if (!ObjectID.isValid(id)) throw err('not_found', 'Sale not found');
  const exists = await sales.getById(id);
  if (!exists) throw err('not_found', 'Sale not found');
};

const saleId = async (id) => {
  if (!ObjectID.isValid(id)) throw err('invalid_data', 'Wrong sale ID format');
};

const stock = async (itensSold) => {
  const arr = await products.getAll();
  const available = itensSold.every(({ productId, quantity }) => {
    const stk = arr.find((e) => e._id.toString() === productId);
    return stk.quantity >= quantity;
  });
  if (!available) throw err('stock_problem', 'Such amount is not permitted to sell');
};

module.exports = { product, productExists, productId, sale, saleExists, saleId, stock };

module.exports = { product, productExists, productId, sale, saleExists, saleId, stock }; 
