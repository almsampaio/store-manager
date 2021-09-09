const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAll = async () => {
  const db = await Connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

const create = async (name, quantity) => {
  const db = await Connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { id: result.insertedId, name, quantity };
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const result = await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return result;
};

const update = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  await db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
  const product = await getById(id);
  return product;
};

const findByName = async (name) => {
  const db = await Connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  findByName,
};