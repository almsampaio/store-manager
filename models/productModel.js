const connect = require('./connection');

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await connect();
  const productName = await db.collection('products').findOne({ name });
  return productName;
};

module.exports = {
  create,
  findByName,
};
