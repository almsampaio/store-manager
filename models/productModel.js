// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const product = await db.collection('products').find().toArray();

  return product;
};

const getName = async (name) => {
  const db = await connect();
  const productName = await db.collection('products').find({ name: { $eq: name } }).toArray();
  
  console.log(productName);
  return productName;
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOnde({ name, quantity });
  
  return { id: product.insertedId, name, quantity };
};

module.exports = { getAll, create, getName };
