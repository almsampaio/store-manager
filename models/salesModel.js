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

module.exports = { create, getAll, getById };
