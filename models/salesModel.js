const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
};

const create = async (sale) => {
  const db = await connect();
  console.log('sales model');
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
};

const updateSale = async (id, sale) => {
  const db = await connect();
  const result = await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: sale } },
  );
  return result;
};

module.exports = { getAll, getById, create, updateSale };
