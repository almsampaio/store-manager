const connection = require('./connection');

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products')
    .insertOne({ name, quantity }));

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));
module.exports = {
  create,
  findByName,
};
