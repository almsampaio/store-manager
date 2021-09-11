const { salesModel, isObjectId } = require('../models/salesModel');
const InvalidDataError = require('../util/InvalidDataError');
const NotFoundError = require('../util/NotFoundError');
const salesSchema = require('../validation/sales');

exports.create = async ({ sales }) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    throw new InvalidDataError('Wrong product ID or invalid quantity');
  }
  const sale = await salesModel.create({ itensSold: sales });
  return sale;
};

exports.getAll = async () => {
  const sales = await salesModel.find({});
  return sales;
};

exports.get = async ({ id }) => {
  if (!isObjectId(id)) throw new NotFoundError('Sale not found');
  const sale = await salesModel.findById(id);
  if (!sale) throw new NotFoundError('Sale not found');
  return sale;
};

exports.update = async ({ id, sales }) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    throw new InvalidDataError('Wrong product ID or invalid quantity');
  }
  await salesModel.updateOne({ _id: id }, { itensSold: sales });
  return salesModel.findById(id);
};

exports.delete = async ({ id }) => {
  if (!isObjectId(id)) throw new InvalidDataError('Wrong sale ID format');
  const sale = await salesModel.findById(id);
  const { _id, itensSold } = sale;
  await salesModel.deleteOne({ _id: id });
  return { _id, itensSold };
};
