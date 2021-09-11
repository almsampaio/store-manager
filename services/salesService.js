const { salesModel, isObjectId } = require('../models/salesModel');
const { productsModel } = require('../models/productsModel');
const InvalidDataError = require('../util/InvalidDataError');
const NotFoundError = require('../util/NotFoundError');
const StockProblemError = require('../util/StockProblemError');
const salesSchema = require('../validation/sales');

exports.create = async ({ sales }) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    throw new InvalidDataError('Wrong product ID or invalid quantity');
  }
  const simulatedNewStock = await Promise.allSettled(
    sales.map(async ({ productId, quantity }) => {
      const { quantity: inventoryQnt } = await productsModel.findById(productId);
      return (inventoryQnt - quantity);
    }),
  );
  const isValidOperation = simulatedNewStock.every(({ value }) => value >= 0);
  if (!isValidOperation) throw new StockProblemError('Such amount is not permitted to sell');
  Promise.all(sales.map(async ({ productId }, index) => {
    const { value } = simulatedNewStock[index];
    await productsModel.updateOne({ _id: productId }, { quantity: value });
  }));
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
  await Promise.allSettled(
    itensSold.map(async ({ productId, quantity }) => {
      const { quantity: inventoryQnt } = await productsModel.findById(productId);
      return productsModel.updateOne({ _id: productId }, { quantity: inventoryQnt + quantity });
    }),
  );
  await salesModel.deleteOne({ _id: id });
  return { _id, itensSold };
};
