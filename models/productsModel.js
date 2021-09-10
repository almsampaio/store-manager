const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'products';

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

const create = async (name, quantity) => (
  connection()
    .then((db) => db.collection(collectionName).insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
);

const update = async (id, name, quantity) => (
  connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }))
);

module.exports = { getAll, findById, deleteById, create, update }; 