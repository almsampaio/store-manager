const connection = require('./connection');

const registerSale = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((sale) => sale.ops[0]);

module.exports = { registerSale };
