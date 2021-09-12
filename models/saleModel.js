const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return result.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const findById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

module.exports = {
  create,
  getAll,
  findById,
};