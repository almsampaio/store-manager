const { ObjectID } = require('mongodb');
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

const findAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  return products;
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connect();
  const prodruct = await db.collection('products').findOne({ _id: ObjectID(id) });
  return prodruct;
};

module.exports = {
  addProduct,
  findByName,
  findAll,
  findById,
};
