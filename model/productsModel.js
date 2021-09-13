const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const create = db.collection('products').insertOne({ name, quantity });
  return create;
};

const existsNameProduct = async (name) => {
  const db = await connection();
  const verify = db.collection('products').findOne({ name });
  return verify;
};

const getProducts = async () => {
  const db = await connection();
  const get = db.collection('products').find().toArray();
  return get;
};

const getPtoductsById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findById = db.collection('products').findOne(ObjectId(_id));
  return findById;
};

module.exports = { createProduct, getProducts, existsNameProduct, getPtoductsById };
