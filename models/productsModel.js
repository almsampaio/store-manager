const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  console.log('model');
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  return { products };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const findByName = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

const updateProduct = async (id, name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
  return product;
};

const deleteProduct = async (id) => {
  const db = await connect();
  const product = await db.collection('products').deleteOne({
    _id: ObjectId(id),
  });
  return product;
};

module.exports = { getAll, getById, findByName, create, updateProduct, deleteProduct };
