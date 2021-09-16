const joi = require('@hapi/joi');
const salesModel = require('../model/sales');
const util = require('../util');

const validateSale = joi.object({
  quantity: joi.number().integer().min(1),
});

const createSale = async (product) => {
  product.forEach(({ quantity }) => {
    const { error } = validateSale.validate({ quantity });
    console.log(error);
    if (error) {
      const message = 'Wrong product ID or invalid quantity';
      throw util(message, 'invalid_data', 422);
    }
  });

  const sale = await salesModel.createSale(product);
  return sale;
};

module.exports = {
  createSale,
};
