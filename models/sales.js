const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const accessSales = () => connection().then((db) => db.collection('sales'));

const createSales = async (itensSold) => {
  const sales = await accessSales();

  const result = await sales.insertOne({ itensSold });

  return result.ops;
};

const getSales = async () => {
  const sales = await accessSales();

  const result = await sales.find({}).toArray();

  return result;
};

const getSalesById = async (id) => {
  const sales = await accessSales();

  if (!ObjectId.isValid(id)) return null;

  const result = await sales.findOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
};
