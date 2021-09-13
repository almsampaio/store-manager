const Joi = require('joi');
const salesModel = require('../models/sales');
const productsModel = require('../models/products');

const INVALID_PRODUCT_DATA = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const INVALID_SALE_DATA = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

const NOT_FOUND = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const validateSaleObject = Joi.object()
.keys({
  quantity: Joi.number().integer().min(1).required(),
  productId: Joi.string().length(24).required(),
})
.unknown(true);

const validateSaleArray = Joi.array().items(validateSaleObject);

const createSales = async (itensSold) => {
  const { error, value } = validateSaleArray.validate(itensSold);

  if (error) return { error: INVALID_PRODUCT_DATA };

  const [result] = await salesModel.createSales(value);

  const { itensSold: products } = result;

  products.forEach(
    ({ productId, quantity }) => productsModel.updateSoldProduct(productId, -quantity),
  );

  return { result };
};

const getSales = async () => {
  const sales = await salesModel.getSales();

  return { sales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);

  if (!sales) return { error: NOT_FOUND };

  return { sales };
};

const updateSale = async (id, itensSold) => {
  const { error, value } = validateSaleArray.validate(itensSold);

  if (error) return { error: INVALID_PRODUCT_DATA };

  const result = await salesModel.updateSale(id, value);

  if (!result) return { error: INVALID_PRODUCT_DATA };

  return { result };
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);

  if (!result) return { error: INVALID_SALE_DATA };

  const { itensSold: products } = result;

  products.forEach(
    ({ productId, quantity }) => productsModel.updateSoldProduct(productId, quantity),
  );

  return { result };
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  updateSale,
  deleteSale,
};
