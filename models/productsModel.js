const connection = require('./connection');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const createProd = async (name, quantity) =>
  connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

module.exports = {
  getAllProducts,
  createProd,
};
