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

module.exports = { createProduct, getProducts, existsNameProduct };
