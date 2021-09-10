const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const result = await db.collection('products').find({}).toArray();
  return result;
};

const getProductByName = async (name) => {
  const db = await getConnection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const createProduct = async (name, quantity) => {
  const db = await getConnection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  createProduct,
  getAll,
  getProductByName,
};
