const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  getAll,
  getById,
};
