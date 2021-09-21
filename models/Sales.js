// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itensSold) => {
  const db = await connection();
  const products = await db.collection('sales').insertOne({ itensSold });
  return products.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const findAllSales = db.collection('sales').find().toArray();
  return findAllSales;
};

module.exports = {
  createSales,
  getAllSales,
};
