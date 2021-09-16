const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (itensSold) => {
  const db = await connect();
  const sales = await db.collection('sales').insertOne({ itensSold });
  return { _id: sales.insertedId, itensSold };
};

const getAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  getAll,
  create,
  getById,
};
