const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const findProductByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .then((result) => result);

const getAll = () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = { 
  create,
  findProductByName,
  getAll,
  getById,
};
