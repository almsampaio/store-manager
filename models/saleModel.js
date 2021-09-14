const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (sales) => {
  const db = await connect();
  const sale = await db.collection('sales').insertOne({ itensSold: sales });
  return sale.ops[0];
};

const getAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connect();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(_id) });
  return sale;
};

const update = async (_id, sales) => {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connect();
  await db.collection('sales').updateOne({ _id: ObjectId(_id) }, { $set: { itensSold: sales } });
  return { _id, itensSold: sales };
};

const exclude = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connect();
  const { value } = await db.collection('sales').findOneAndDelete({ _id: ObjectId(_id) });
  return value;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,

};
