const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (product) return null;

  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((response) => response.ops[0]);
};

const getAll = async () =>
   connection()
    .then((db) => db.collection('products').find().toArray())
    .then((response) => response);

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then((response) => response);
};

module.exports = {
  add,
  getAll,
  getById,
};
