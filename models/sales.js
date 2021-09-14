const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db.collection('sales').findOne(new ObjectId(id));
  if (!sale) return null;
  return sale;
};

const create = async (array) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold: array });
  return sales;
};

const update = async (id, itensSold) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db
  .collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  if (!sale) return null;
  return sale;
};

const exclude = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  if (!sale) return null;
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
