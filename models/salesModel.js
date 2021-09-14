const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (itensSold) => {
  const db = await getConnection();
  const resultDb = await db.collection('sales').insertMany([{ itensSold }]);
  return { _id: Object.values(resultDb.insertedIds).toString(), itensSold };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const getAllSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const editSaleById = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('sales')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: ObjectId(id), itensSold };
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const result = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  return result;
};

module.exports = { 
  create,
  getSaleById,
  getAllSales,
  editSaleById,
  deleteSaleById,
};