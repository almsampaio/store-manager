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

const modelUpdate = async (name, quantity, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return modelGetById(id);
};

const modelDelete = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

const modelQuantityUpdate = async (productId, quantity) => {
  const db = await connection();
    await db.collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity } });
};

module.exports = {
  modelCreate,
  modelGetAll,
  modelGetByName,
  modelGetById,
  modelUpdate,
  modelDelete,
  modelQuantityUpdate,
};