const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAll = async () => {
  const db = await Connection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return sale;
};

const create = async (itensSold) => {
  const db = await Connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return { _id: result.insertedId, itensSold };
};

const getByItensSold = async (itensSold) => {
  const db = await Connection();
  const sale = await db.collection('sales').findOne({ itensSold });
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  getByItensSold,
};