const { ObjectId } = require('mongodb');
const productModel = require('../models/Products');
const saleModel = require('../models/Sales');

const productStringValidation = (value) => typeof value !== 'string';
const productLengthValidation = (value, minimal) => value.length < minimal;
const productQuantTypeValidation = (value) => typeof value !== 'number';
const productQuantCountValidation = (value, length) => value < length;

const productsValidations = async (name, quantity) => {
  switch (true) {
    case productStringValidation(name): return {
      err: { code: 'invalid_data', message: '"name" must be a String' },
    };

    case productLengthValidation(name, 5): return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };

    case productQuantTypeValidation(quantity): return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };

    case productQuantCountValidation(quantity, 1): return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };

    default: return {};
  }
};

const decreaseProductStock = async (id, quantity) => {
  const product = await productModel.getProductById(id);

  if (product.quantity >= quantity) {
    const newQuantity = product.quantity - quantity;
    await productModel.updateProductQuantity(id, newQuantity);
    return null;
  }

  const errorMessage = { err:
    { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
  };

  return errorMessage;
};

const increaseProductStock = async (id, quantity) => {
  const product = await productModel.getProductById(id);
  const newQuantity = product.quantity + quantity;
  await productModel.updateProductQuantity(id, newQuantity);
};

const verifyIdSale = async (id) => {
  const sale = await saleModel.getSaleById(id);

  if (!sale) {
    const errorMessage = { err:
      { code: 'invalid_data', message: 'Wrong sale ID format' },
    };
  
    return { errorMessage };
  }

  return { sale };
};

const differenceInSale = async (id, newQuantity) => {
  const actualSale = await verifyIdSale(id);
  const { sale: { itensSold } } = actualSale;
  const { quantity } = itensSold[0];
  return quantity - newQuantity;
};

const validateIdSale = (id) => {
  if (!ObjectId.isValid(id)) {
    const errorMessage = { err:
      { code: 'invalid_data', message: 'Wrong sale ID format' },
    };
  
    return { errorMessage };
  }
};

const validateSale = async (id, quantity) => {
  const product = await productModel.getProductById(id);
  if (!product || quantity < 1 || (typeof quantity !== 'number')) {
    const notValid = { err:
      { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
    return { notValid };
  }
  const error = await decreaseProductStock(id, quantity);
  return { error };
};

module.exports = {
  productsValidations,
  decreaseProductStock,
  increaseProductStock,
  differenceInSale,
  validateIdSale,
  validateSale,
  verifyIdSale,
};
