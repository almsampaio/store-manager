// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const FindProductByName = async (name) => {
  const db = await connect();
  const product = await db.collection('products').finOne({ name });
  return product;
};

const createProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  createProduct,
  FindProductByName,
};
