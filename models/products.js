const { ObjectId } = require('mongodb');
const connection = require('../connection');

const modelCreate = async (name, quantity) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedId, name, quantity };
};

const modelGetAll = async () => {
  const db = await connection();
  const elements = db.collection('products').find().toArray();
  return elements;
};

const modelGetByName = async (name) => {
  const db = await connection();
  const elements = db.collection('products').findOne({ name });
  return elements;
};

const modelGetById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const elements = db.collection('products').findOne(ObjectId(id));
  return elements;
};

module.exports = {
  modelCreate,
  modelGetAll,
  modelGetByName,
  modelGetById,
};