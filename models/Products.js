const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: newProduct.insertedId, name, quantity };
};

const getByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

module.exports = {
  create,
  getByName,
};
