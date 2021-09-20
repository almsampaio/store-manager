const connection = require('./connection');

const create = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result.ops[0]);

const getByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

module.exports = {
  create,
  getByName,
};
