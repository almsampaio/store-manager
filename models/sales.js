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

module.exports = {
  create,
  getAll,
  getById,
};
