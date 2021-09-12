const model = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { largerThan } = require('../schemas/numbers');
const { isString } = require('../schemas/strings');
const {
  codes: { invalidData, notFound },
  messages: { invalidQuantity, saleNotFound, wrongSaleId },
} = require('../messages/messages');

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

  return sales;
};

const findById = async (id) => {
  const sale = await model.findById(id);

  if (!sale) return ({ err: { code: notFound, message: saleNotFound } });

  return sale;
};

const updateOne = async (productId, quantity) => {
  if (largerThan(quantity, 0)) {
    return ({ err: { code: invalidData, message: invalidQuantity } });
  }

  if (isString(quantity)) {
    return ({ err: { code: invalidData, message: invalidQuantity } });
  }

  const sales = await model.updateOne(productId, quantity)
    .then(([sale]) => ({ ...sale, itensSold: [sale.itensSold] }));
    // Implementação do then baseada na lógica de Matheus Martino: https://github.com/tryber/sd-09-store-manager/pull/40/

  if (!sales) return ({ err: { code: invalidData, message: invalidQuantity } });

  return sales;
};

const deleteOne = async (id) => {
  const sale = await model.deleteOne(id);

  if (!sale) return ({ err: { code: invalidData, message: wrongSaleId } });

  return sale;
};

module.exports = {
  create,
  findAll,
  findById,
  updateOne,
  deleteOne,
};
