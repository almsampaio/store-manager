// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const zeroIndex = 0;

const create = async (name, quantity) =>
  connection()
    .then((db) =>
      db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[zeroIndex]);

    module.exports = {
      create,
    };