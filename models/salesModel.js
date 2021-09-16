// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addSale = async (itensSold) => {
  const db = await connect();
  const product = await db.collection('sales').insertOne({ itensSold });
  return { _id: product.insertedId, itensSold };
};

module.exports = {
  addSale,
};