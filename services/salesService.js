const { salesModel } = require('../models/salesModel');
const InvalidDataError = require('../util/InvalidDataError');
const salesSchema = require('../validation/sales');

exports.create = async ({ sales }) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    throw new InvalidDataError('Wrong product ID or invalid quantity');
  }
  const sale = await salesModel.create({ itensSold: sales });
  return sale;
};
