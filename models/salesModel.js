const { ObjectId } = require('mongodb');
const conn = require('./conn');

const COLLECTION = 'sales';

const create = async (products) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));

  const register = await dbConn.insertMany([{ itensSold: products }]);

  return register.ops[0];
};

const getAll = () => conn().then((db) => db.collection(COLLECTION).find().toArray());

const getById = async (id) => {
  const db = await conn();
  const result = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });
  return result;
};

const update = async (id, itensSold) => {
  const db = await conn();
  await db.collection(COLLECTION).updateOne({ _id: ObjectId(id) },
    { $set: { itensSold } });
  return {
    _id: id,
    itensSold,
  };
};

const destroy = async (id) => {
  const db = await conn();
  const product = await getById(id);
  await db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = { create, getAll, getById, update, destroy };
