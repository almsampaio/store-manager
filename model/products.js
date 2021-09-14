const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const value = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return value.ops[0];
};

const findName = async (name) => {
  const value = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return value;
};

module.exports = {
  createProduct,
  findName,
};
