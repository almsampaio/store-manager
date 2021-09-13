// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (itensSold) => {
  const db = await connect();
  const salesItens = await db.collection('sales').insertOne({ itensSold });
  return salesItens.ops[0];
};

module.exports = {
  createSales,
};
