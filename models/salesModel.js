const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();

  return { sales };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  return { sale };
};

const create = async (itensSold) => {
  const db = await connect();
  const sales = await db.collection('sales').insertOne({ itensSold });

  return { _id: sales.insertedId, itensSold };
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  return { _id: ObjectId(id), itensSold };
};

const exclude = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return { _id: ObjectId(id), itensSold };
};

module.exports = { getAll, getById, create, update, exclude };
