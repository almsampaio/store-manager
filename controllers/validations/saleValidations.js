const rescue = require('express-rescue');
const { ObjectID } = require('mongodb');
const ProductAlreadyExists = require('../../errors/ProductAlreadyExists');
const SaleNotFound = require('../../errors/SaleNotFound');
const WrongSaleIdFormat = require('../../errors/WrongSaleIdFormat');
const {
  productsIdExists,
  productsQuantityGTEOne,
  subtractProductsQuantity,
} = require('../../services/saleService');
const AppError = require('../../errors/AppError');

const errorsMessages = {
  code: 'invalid_data',
  allProductsIdExists: 'Wrong product ID or invalid quantity',
};

const allIdsExists = rescue(async (req, _res, next) => {
  const sale = req.body;

  const allProductsIdExists = await productsIdExists(sale);

  if (!allProductsIdExists) {
    throw new ProductAlreadyExists();
  }

  return next();
});

const allqtyGTEOne = rescue(async (req, _res, next) => {
  const sale = req.body;

  const allProductsQuantityGTEOne = productsQuantityGTEOne(sale);

  if (!allProductsQuantityGTEOne) {
    throw new AppError('Validation: Sale: products quantity > 0',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.allProductsIdExists,
      } });
  }

  return next();
});

const isValidId = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (typeof id !== 'string' || !ObjectID.isValid(id)) {
    throw new SaleNotFound();
  }

  return next();
});

const saleIdNotFound = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (typeof id !== 'string' || !ObjectID.isValid(id)) {
    throw new WrongSaleIdFormat();
  }

  return next();
});

const saleSubtractProductsQuantity = rescue(async (req, res, next) => {
  const sale = req.body;

  await subtractProductsQuantity(sale);

  return next();
});

// const saleAddProductsQuantity = rescue(async (req, res, next) => {
//   const sale = req.body;

//   await addProductsQuantity(sale);

//   return next();
// });

module.exports = {
  allIdsExists,
  allqtyGTEOne,
  isValidId,
  saleIdNotFound,
  saleSubtractProductsQuantity,
  // saleAddProductsQuantity,
};