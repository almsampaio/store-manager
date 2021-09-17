const connection = require('./mongoConnection');

const create = async (name, quantity) =>
  connection().then((db) =>
  db.collection('products').insertOne({ name, quantity }));

const getProducts = async () =>
  connection().then((db) => 
  db.collection('products').find().toArray());

module.exports = {
  create,
  getProducts,
};