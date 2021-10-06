const { ObjectID } = require('mongodb');
const connection = require('../db/index');

const create = async (data) => {
  const createProduct = await connection().then((db) =>
  db.collection('products').insertOne(data));
  return createProduct.ops[0];
};

const findByName = async (name) => {
  const product = await connection().then((db) =>
  db.collection('products').findOne({ name }));
  return product;
};

const getProducts = async () => {
  const products = await connection().then((db) =>
  db.collection('products').find().toArray());
  return { products };
};

const getProduct = async (id) => {
  const product = await connection().then((db) =>
  db.collection('products').findOne(new ObjectID(id)));
  return product;
};

const updateProduct = async (id, data) => {
  await connection().then((db) =>
  db.collection('products')
  .findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' }))
  .then((result) => result.value);
};

const deleteProduct = async (id) => {
  if (!ObjectID.isValid(id)) return null;

  await connection().then((db) =>
  db.collection('products').deleteOne({ _id: ObjectID(id) }));
};

module.exports = {
  create,
  findByName,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
