const { ObjectID } = require('mongodb');
const getConnection = require('./connection');

const create = async (name, quantity) => {
  const db = await getConnection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const getByName = async (name) => {
  const db = await getConnection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getAll = async () => {
  const db = await getConnection();
  const result = await db.collection('products').find({}).toArray();
  return result;
};

const getById = async (productId) => {
  if (!ObjectID.isValid(productId)) return null;
  const db = await getConnection();
  const result = await db.collection('products').findOne({ _id: ObjectID(productId) });
  return result;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
   await db.collection('products')
  .updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
  const result = await getById(id);
  return result;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  updateProduct,
};
