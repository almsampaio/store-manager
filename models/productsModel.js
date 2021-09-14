// const { ObjectID } = require('mongodb');
const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connect();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await connect();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getAll = async () => {
  const db = await connect();
  const result = await db.collection('products').find({ });
  return result;
};

module.exports = {
  addProduct,
  findByName,
  getAll,
};
