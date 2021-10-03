const { connection } = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductByName = async (name) => {
  const db = await connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

const create = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  getAll,
  create,
  getProductByName,
};
