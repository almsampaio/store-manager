const mongoConnection = require('./connection');

const getAll = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('products').find({}).toArray();
  
  return result;
};

const createProduct = async (name, quantity) => {
  const connection = await mongoConnection();
  const result = await connection.collection('products').insertOne({ name, quantity });

  return { id: result.insertedId, name, quantity };
};

module.exports = {
  getAll,
  createProduct,
};
