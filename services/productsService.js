const Product = require('../models/productsModel');
const { stringLenght, isString } = require('../validations/strings');
const { largerThan } = require('../validations/numbers');
const {
  codes: { invalidData },
  messages: { productAlreadyExists, productNameLength, quantityLarger, beANumber },
} = require('../messages/messages');

const create = async (name, quantity) => {
  const existingProduct = await Product.findByName(name);
  console.log('linha 11 service', existingProduct);

  if (stringLenght(name, 5)) {
    return ({ err: { code: invalidData, message: productNameLength } });
  }

  if (largerThan(quantity, 0)) {
    return ({ err: { code: invalidData, message: quantityLarger } });
  }

  if (isString(quantity)) {
    return ({ err: { code: invalidData, message: beANumber } });
  }

  if (existingProduct) {
    return ({ err: { code: invalidData, message: productAlreadyExists } });
  }

  return Product.create(name, quantity);
};

module.exports = {
  create,
};
