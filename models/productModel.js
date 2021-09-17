const { ObjectId } = require('mongodb');
const conn = require('./conn');

const create = async (name, quantity) => {
  const dbConn = await conn().then((db) => db.collection('products'));

  const { insertedId: _id } = await dbConn.insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  const db = await conn();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getAll = () => conn().then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  const db = await conn();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
};

const update = async (id, name, quantity) => {
  const db = await conn();
  await db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } });
  return {
    id, name, quantity,
  };
};

module.exports = { create, getByName, getAll, getById, update };