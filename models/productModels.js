const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getByName = async (paramName) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('products').findOne({ name: paramName });
  if (!result) return null;
  return result;
};

const create = async (name, quantity) => {
  const nameExists = await getByName(name);
  if (nameExists) return null;

  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: ObjectId(id),
    name, 
    quantity,
  };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('products').find().toArray();
  return { products: result };
};

const getById = async (idParam) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;
  const db = await mongoConnection.getConnection();
  const result = await db.collection('products').findOne({ _id: ObjectId(idParam) });
  if (!result) return null;
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};
