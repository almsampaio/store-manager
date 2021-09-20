// const { ObjectID } = require('mongodb');
const connect = require('./connection');

const insertSale = async (itensSold) => {
  const db = await connect();

  const result = await db.collection('sales').insertOne({ itensSold });

  return { _id: result.insertedId, itensSold };
};

const findById = async (itensSold) => {
  const db = await connect();
  const sale = await db.collection('sales').findOne({ itensSold });
  return sale;
};
module.exports = {
  insertSale,
  findById,
};