const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (itensSold) => {
  const db = await getConnection();
  const resultDb = await db.collection('sales').insertMany([{ itensSold }]);
  return { _id: Object.values(resultDb.insertedIds).toString(), itensSold };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const getAllSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const editById = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('sales')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: ObjectId(id), itensSold };
};

module.exports = { 
  create,
  getSaleById,
  getAllSales,
  editById,
};