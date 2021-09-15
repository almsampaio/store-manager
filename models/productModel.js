const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const getAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  return products;
};

const findByName = async (name) => {
  const db = await connect();
  const productName = await db.collection('products').findOne({ name });
  return productName;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  const product = await getById(id);
  return product;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  findByName,
  getById,
  update,
  exclude,
};
