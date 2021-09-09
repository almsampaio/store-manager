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

const update = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  await db.collection('sales').updateOne({ _id: ObjectID(id) }, { $set: { itensSold } });
  const sale = await getById(id);
  return sale;
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const result = await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return result;
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
  update,
  remove,
};