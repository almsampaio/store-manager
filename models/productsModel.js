const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const messageErro = require('../utils/errosMsg');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const createProd = async (name, quantity) =>
  connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

const findAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const findOneProduct = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) }));
};

const updateProduct = (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

const deleteProduct = (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) =>
    db
      .collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllProducts,
  createProd,
  findAllProducts,
  findOneProduct,
  updateProduct,
  deleteProduct,
};
