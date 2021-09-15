const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result.ops[0]);

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => sales);

const find = async (id) => connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)))
    .catch(() => null);

module.exports = {
  create,
  getAll,
  find,
};
