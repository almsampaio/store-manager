const { ObjectId } = require('mongodb');
const conn = require('./conn');

const COLLECTION = 'products';

const create = async (name, quantity) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await dbConn.insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  const db = await conn();
  const result = await db.collection(COLLECTION).findOne({ name });
  return result;
};

const getAll = () => conn().then((db) => db.collection(COLLECTION).find().toArray());

const getById = async (id) => {
  const db = await conn();
  const result = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });
  return result;
};

const update = async (id, name, quantity) => {
  const db = await conn();
  await db.collection(COLLECTION).updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } });
  return {
    id, name, quantity,
  };
};

const destroy = async (id) => {
  const db = await conn();
  const product = await getById(id);
  await db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = { create, getByName, getAll, getById, update, destroy };