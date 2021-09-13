// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const product = await db.collection('products').find().toArray();

  return product;
};

const getName = async (name) => {
  const db = await connect();
  const productName = await db.collection('products').findOne({ name });
  
  return productName;
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  
  return { _id: product.insertedId, name, quantity };
};

module.exports = { getAll, create, getName };
