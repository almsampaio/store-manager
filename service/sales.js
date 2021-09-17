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

  if (!sales) throw util('Wrong id format', 'not_found', 404);

  return sales;
};

module.exports = {
  createSale,
  findSales,
  findSalesId,
};
