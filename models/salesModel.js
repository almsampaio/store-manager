// const { ObjectID } = require('bson');
const connection = require('./mongoConnection');

const create = async (productsSold) =>
  connection().then((db) =>
  db.collection('sales').insertOne({
      itensSold: productsSold,
  }));

const getSales = async () =>
  connection().then((db) => 
  db.collection('sales').find().toArray());

module.exports = {
  create,
  getSales,
};