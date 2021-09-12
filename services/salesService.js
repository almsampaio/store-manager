const model = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { largerThan } = require('../schemas/numbers');
const {
  codes: { invalidData },
  messages: { invalidQuantity },
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

module.exports = {
  create,
};
