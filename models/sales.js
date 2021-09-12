// const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const accessSales = () => connection().then((db) => db.collection('sales'));

const createSales = async (itensSold) => {
  const sales = await accessSales();

  const result = await sales.insertOne({ itensSold });

  return result.ops;
};

module.exports = {
  createSales,
};
