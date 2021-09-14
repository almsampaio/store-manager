const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (sales) => {
  const db = await connect();
  const sale = await db.collection('sales').insertOne({ itensSold: sales });
  return sale.ops[0];
};

const getAll = async () => {
  const db = await connect();
  const products = await db.collection('sales').find().toArray();
  return products;
};

const getById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connect();
  const product = await db.collection('sales').findOne({ _id: ObjectId(_id) });
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
};
