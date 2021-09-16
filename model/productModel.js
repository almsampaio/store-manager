const { ObjectID } = require('bson');

const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const insertedProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedProduct.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAll = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  return db.collection('products').findOne(ObjectID(id));
};

module.exports = {
  create,
  findProductByName,
  getAll,
  getById,
};
