const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const value = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return value.ops[0];
};

const findName = async (name) => {
  const value = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return value;
};

const findProducts = async () => {
  const value = await connection()
    .then((db) => db.collection('products').find({ }).toArray());
  return value;
};

const findProductId = async (id) => {
  const value = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    console.log(value);
  return value;
};

module.exports = {
  createProduct,
  findName,
  findProducts,
  findProductId,
};
