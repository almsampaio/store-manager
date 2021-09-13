const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products')
    .insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updated = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return updated;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('products')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
};
