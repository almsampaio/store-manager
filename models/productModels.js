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

module.exports = {
  create,
};
