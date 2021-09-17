const joi = require('@hapi/joi');
const salesModel = require('../model/sales');
const util = require('../util');

const validetionId = /[0-9a-z]{24}/;

const validateSale = joi.object({
  quantity: joi.number().integer().min(1),
});

const createSale = async (product) => {
  product.forEach(({ quantity }) => {
    const { error } = validateSale.validate({ quantity });
    if (error) {
      const message = 'Wrong product ID or invalid quantity';
      throw util(message, 'invalid_data', 422);
    }
  });

  const sale = await salesModel.createSale(product);
  return sale;
};

const findSales = async () => {
  const sales = await salesModel.findSales();
  return sales;
};

const findSalesId = async (id) => {
  if (!validetionId.test(id)) {
    throw util(
      'Sale not found',
      'not_found',
      404,
    );
  }

  const sales = await salesModel.findSalesId(id);

  if (!sales) throw util('Sale not found', 'not_found', 404);

  return sales;
};

const updateSale = async (id, product) => {
  product.forEach(({ quantity, productId }) => {
    const { error } = validateSale.validate({ quantity });

    if (error) {
      const message = 'Wrong product ID or invalid quantity';
      throw util(message, 'invalid_data', 422);
    }

    if (!validetionId.test(productId)) {
      throw util(
        'Sale not found',
        'not_found',
        404,
      );
    }
  });

  await salesModel.updateSale(id, product);

  const sale = await salesModel.findSalesId(id);
  return sale;
};

const deleteSale = async (id) => {
  if (!validetionId.test(id)) {
    throw util(
      'Wrong sale ID format',
      'invalid_data',
      422,
    );
  }

  const sale = await salesModel.findSalesId(id);

  if (!sale) throw util('Wrong sale ID format', 'invalid_data', 422);

  await salesModel.deleteSale(id);

  return sale;
};

module.exports = {
  createSale,
  findSales,
  findSalesId,
  updateSale,
  deleteSale,
};
