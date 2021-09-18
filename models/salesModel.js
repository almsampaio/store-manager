// const { ObjectID } = require('bson');
const connection = require('./mongoConnection');

const create = async (productSold) =>
  connection().then((db) =>
  db.collection('sales').insertOne({ itensSold: { productSold } }));

const getSales = async () =>
  connection().then((db) => 
  db.collection('sales').find().toArray());

module.exports = {
  create,
  getSales,
};