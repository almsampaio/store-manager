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

const listProductId = async (id) => {
  const db = await connect();
  const productId = await db.collection('products').findOne(id);
  return productId;
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
};