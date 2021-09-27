const { ObjectId } = require('mongodb');
const connection = require('../connection');

const modelCreate = async (saleData) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ saleData });
  return { _id: insertedId, saleData };
};

const modelGetAll = async () => {
  const db = await connection();
  const elements = db.collection('sales').find().toArray();
  return elements;
};

const modelGetById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const elements = db.collection('sales').findOne(ObjectId(id));
  return elements;
};

const modelUpdate = async (quantity, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { quantity } });
  return modelGetById(id);
};

const modelDelete = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return modelGetById(id);
};

module.exports = {
  modelCreate,
  modelGetAll,
  modelGetById,
  modelUpdate,
  modelDelete,
};
