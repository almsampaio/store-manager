// const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createModel = async (name, quantity) => {
  const db = await connection();
  const insertUsers = await db.collection('products')
    .insertOne({ name, quantity });
  const result = { _id: insertUsers.insertedId, name, quantity };
  return result;
};

const readByNameModel = async (name) => {
  const db = await connection();
  const result = await db.collection('products')
    .findOne({ name });
  return result;
};

module.exports = { 
  createModel,
  readByNameModel,
};