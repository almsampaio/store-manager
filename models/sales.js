// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const create = async (array) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold: array });
  return sales;
};

module.exports = {
  create,
  getAll,
};
