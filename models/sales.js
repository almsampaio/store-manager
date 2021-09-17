const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const accessSales = () => mongoConnection.connection().then((db) => db.collection('sales'));

const createSales = async (itensSold) => {
  const sales = await accessSales();

  const { ops } = await sales.insertOne({ itensSold });

  return ops;
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

const updateSale = async (id, itensSold) => {
  const sales = await accessSales();

  if (!ObjectId.isValid(id)) return null;

  const { value } = await sales.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
    { returnOriginal: false },
  );

  return value;
};

const deleteSale = async (id) => {
  const sales = await accessSales();

  if (!ObjectId.isValid(id)) return null;

  const { value } = await sales.findOneAndDelete(
    { _id: ObjectId(id) },
  );

  return value;
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  updateSale,
  deleteSale,
};
