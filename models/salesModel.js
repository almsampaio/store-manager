const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then((response) => response.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('sales').findOne(new ObjectId(id)));

module.exports = {
  add,
  getAll,
  getById,
};
