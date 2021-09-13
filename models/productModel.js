// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getByName = async (name) => {
  const db = await connect();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

module.exports = {
  getByName,
  create,
};
