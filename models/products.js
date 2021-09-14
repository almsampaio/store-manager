const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: insertedId, name, quantity };
};

const findName = async (name) => {
  const search = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return search;
};

const findProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const findProduct = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const edited = await connection()
    .then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return edited;
};

const deleteProduct = async (id) => {
  const erase = await connection()
    .then((db) => db
      .collection('products')
      .deleteOne({ _id: ObjectId(id) }));
  return erase;
};

module.exports = {
  addProduct,
  findName,
  findProducts,
  findProduct,
  updateProduct,
  deleteProduct,
};
