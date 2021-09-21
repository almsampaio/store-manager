const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (sale) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

module.exports = { 
  create,
  getAll,
  getById,
};
