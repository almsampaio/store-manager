const { ObjectId } = require('mongodb');

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

const readByAllModel = async () => {
  const db = await connection();
  const result = await db.collection('products').find({}).toArray();

  return result;
};

const readByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
};

const updateModel = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('products')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          quantity,
        },
      },
    );
    
  return result;
};

module.exports = { 
  createModel,
  readByNameModel,
  readByAllModel,
  readByIdModel,
  updateModel,
};