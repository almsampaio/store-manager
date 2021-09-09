const { ObjectId } = require('bson');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const create = async (name, quantity) => {
  const db = await getConnection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await getConnection();
  const product = await db.collection('products').findOne({name});
  return product;
};

module.exports = {
  // getAll,
  // getById,
  create,
  findByName,
  // editById,
  // deleteById
};
