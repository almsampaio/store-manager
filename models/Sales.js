const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return { sales };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return { _id: result.insertedId, itensSold };
};

module.exports = {
  getAll,
  create,
  getSaleById,
};
