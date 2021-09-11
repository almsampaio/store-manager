const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((response) => response.ops[0]);

const findAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((response) => ({ products: response }));

  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  return product;
};

const updateOne = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
  .then((db) => db.collection('products').update({ _id: new ObjectId(id) }, { name, quantity }))
  .then(() => ({ _id: id, name, quantity }));

  return product;
};

module.exports = {
  findByName,
  create,
  findAll,
  findById,
  updateOne,
};
