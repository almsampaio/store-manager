// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (sales) => {
  const db = await connect();
  const sale = await db.collection('sales').insertOne({ itensSold: sales });
  return sale.ops[0];
};

module.exports = {
  create,
};
