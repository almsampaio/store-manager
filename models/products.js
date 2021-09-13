const { ObjectId } = require('mongodb');
const connection = require('./connection');

const existsProduct = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  if (product) return true;
  return false;
};

const findProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const insertNewProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return ({ _id: newProduct.insertedId, name, quantity });
};

module.exports = { insertNewProduct, existsProduct, findProductById };