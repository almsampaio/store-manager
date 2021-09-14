const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const error = {
  wrongId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
  saleNotFound: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
  stockProblem: {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    },
  },
};

const isValidID = (id) => ObjectId.isValid(id);

const checkIfProductExistsInStock = async (sale) => {
  const idsExists = await Promise.all(sale.map(async ({ productId, quantity }) => {
    if (!isValidID(productId)) return false;
    const productExists = await productModel.getByID(productId);

    return productExists.quantity >= quantity;
  }));

  return idsExists.every((ids) => ids === true);
};

const subtractsTheQuantityFromTheStock = async (sale) => {
  const result = await Promise.all(sale.map(async ({ productId, quantity }) => {
    const product = await productModel.getByID(productId);

    const newProduct = {
      name: product.name,
      quantity: (product.quantity - quantity),
    };

    const updatedProduct = await productModel.update(productId, newProduct);

    return updatedProduct;
  }));

  return result.every((item) => item);
};

const addsTheQuantityOfTheProductInStock = async (sale) => {
  const result = await Promise.all(sale.map(async ({ productId, quantity }) => {
    const matchedProduct = await productModel.getByID(productId);
    const productToUpdate = {
      name: matchedProduct.name,
      quantity: matchedProduct.quantity + quantity,
    };
    const savedProduct = await productModel.update(productId, productToUpdate);
    return savedProduct;
  }));

  return result.every((item) => item);
};

const create = async (sale) => {
  const productsExists = await checkIfProductExistsInStock(sale);

  if (!productsExists) return error.stockProblem;

  const subtractOk = await subtractsTheQuantityFromTheStock(sale);

  if (!subtractOk) return error.stockProblem;

  const result = await saleModel.create(sale);

  return result || error.stockProblem;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (id) => {
  const result = await saleModel.getByID(id);

  return result || error.saleNotFound;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => saleModel.getAll();

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (id, sale) => {
  const result = await saleModel.update(id, sale);

  return result || error.wrongId;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (id) => {
  const result = await saleModel.exclude(id);

  if (!result) return error.wrongId;

  await addsTheQuantityOfTheProductInStock(result.itensSold);

  return result;
};

module.exports = { create, getByID, getAll, update, exclude };
