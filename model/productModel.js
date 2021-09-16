const connect = require('./connection');

const create = async (name, quantity) => {
  const db = await connect();
  const insertedProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedProduct.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({ name });
  return product;
};
module.exports = {
  create,
  findProductByName,
};
