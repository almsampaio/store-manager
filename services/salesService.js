const model = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { largerThan } = require('../schemas/numbers');
const {
  codes: { invalidData, notFound },
  messages: { invalidQuantity, saleNotFound },
} = require('../messages/messages');
const { isString } = require('../schemas/strings');

const create = async (sale) => {
  const { productId, quantity } = sale[0];
  const currentProduct = productsModel.findById(productId);

  if (!currentProduct) return null;

  if (largerThan(quantity, 0)) {
    return ({ err: { code: invalidData, message: invalidQuantity } });
  }

  if (isString(quantity)) {
    return ({ err: { code: invalidData, message: invalidQuantity } });
  }

  return model.create(sale);
};

const findAll = async () => {
  const sales = await model.findAll();

  // console.log(sales);

  return sales;
};

const findById = async (id) => {
  const sale = await model.findById(id);

  if (!sale) return ({ err: { code: notFound, message: saleNotFound } });

  return sale;
};

module.exports = {
  create,
  findAll,
  findById,
};
