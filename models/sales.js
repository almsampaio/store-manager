const { ObjectId } = require('mongodb');

const connection = require('./connection');

const create = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }));

const getAll = async () => connection()
  .then((db) => db.collection('sales').find({}).toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getById,
};