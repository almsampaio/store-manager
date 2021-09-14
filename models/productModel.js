const { ObjectID } = require('bson');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

const create = async (name, quantity) => {
  const db = await getConnection();
  const findName = await db.collection('products').findOne({ name });
  if (findName) return { statusCode: 422 };
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  getAll,
  getById,
  create,
};
