const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectID.isValid(id)) return false;
  const result = await db.collection('products').findOne({ _id: ObjectID(id) });
  return result;
};

const getByName = async (param) => {
  const db = await connection();
  const result = await db.collection('products').find({ name: param }).toArray();
  return result;
};

const create = async (name, quantity) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedId, name, quantity };
};

const update = async (id, namee, quantityy) => {
  const db = await connection();
  if (!ObjectID.isValid(id)) return false;
  await db.collection('products').updateOne({ _id: ObjectID(id) },
    { $set: { name: namee, quantity: quantityy } });
  return { _id: id, name: namee, quantity: quantityy };
};

module.exports = {
  getAll,
  getByName,
  create,
  getById,
  update,
};
