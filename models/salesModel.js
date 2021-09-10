const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'sales';

const getAll = async () => (
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
);

const findById = async (id) => (
  connection()
    .then((db) => db.collection(collectionName).findOne(new ObjectId(id)).toArray())
);

const deleteById = async (id) => (
  connection()
    .then((db) => db.collection(collectionName).deleteOne(new ObjectId(id)))
);

const create = async (itensSold) => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ itensSold }))
    .then((result) => ({ id: result.insertedId, itensSold }))
);

module.exports = { getAll, findById, deleteById, create }; 