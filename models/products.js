const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find({}).toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products')
    .insertOne({ name, quantity }));

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const update = async (id, name, quantity) => {
  connection()
  .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { id, name, quantity };
  };

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
};
