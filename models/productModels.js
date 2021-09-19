const { ObjectID } = require('mongodb');
const getConnection = require('./connections');

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

module.exports = {
  create,
  getByName,
  getAll,
  getById,
};
