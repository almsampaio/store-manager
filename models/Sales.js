// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (arrSales) => {
  const db = await connection();
  const products = await db.collection('sales').insertMany([{ arrSales }])
    .then((result) => ({ _id: Object.values(result.insertedIds).toString(), itensSold: arrSales }));

  return products;
};

module.exports = {
  createSales,
};
