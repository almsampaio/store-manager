const connection = require('./connection');

const createNewSales = async (data) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: data }))
  .then((sale) => ({ _id: sale.insertedId, itensSold: data }))
  .catch((e) => e.message);

module.exports = { createNewSales };
