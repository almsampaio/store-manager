const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  return products;
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
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

module.exports = {
  getAll,
  create,
  findByName,
  getById,
  update,
};
