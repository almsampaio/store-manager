const connection = require('./connection');

const create = async (itensSold) =>
  connection().then((db) => db.collection('sales').insertOne({ itensSold }));

const findSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

module.exports = { create, findSales };
