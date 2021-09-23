const connection = require('../connection');

const modelCreate = async (name, quantity) => {
  const db = await connection();
  const elements = db.collection('products').insertOne({ name, quantity });
  return { _id: elements.insertedId, name, quantity };
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

module.exports = {
  modelCreate,
  modelGetAll,
  modelGetByName,
};