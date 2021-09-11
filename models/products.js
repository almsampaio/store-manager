const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: insertedId, name, quantity };
};

const findName = async (name) => {
  const search = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return search;
};

module.exports = {
  createProduct,
  findName,
};
