// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const create = (itemSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itemSold }));

module.exports = {
  create,
};