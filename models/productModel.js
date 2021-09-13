const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { id: product.insertedId, name, quantity };
};

const listProduct = async () => {
  const db = await connect();
  const list = await db.collection('products').find().toArray();
  return list; 
};

module.exports = {
  addProduct,
  listProduct,
};