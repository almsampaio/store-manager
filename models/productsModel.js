const { ObjectId } = require('mongodb');

const mongoConnection = require('./connection');

const getAll = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('products').find({}).toArray();
  
  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connection = await mongoConnection();
  const result = await connection.collection('products').findOne(ObjectId(id));
  return result;
};

const getByName = async (name) => {
  const connection = await mongoConnection();
  const result = await connection.collection('products').findOne({ name });
  return result;
};

const createProduct = async (name, quantity) => {
  const connection = await mongoConnection();
  const result = await connection.collection('products').insertOne({ name, quantity });

  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  getAll,
  createProduct,
  getById,
  getByName,
};
