const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const product = await db.collection('products').findOne(ObjectId(id));

  return { product };
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

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: ObjectId(id), name, quantity };
};

const exclude = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return { _id: ObjectId(id), name, quantity };
};

module.exports = { getAll, getById, getName, create, update, exclude };
