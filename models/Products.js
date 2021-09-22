const connection = require('./connection');

const create = async (name, quantity) => {
  const operation = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return operation.ops[0];
};

const getAllProducts = async () => {
  const result = await connection().then((db) => db.collection('products').find().toArray());
  return result;
};

module.exports = {
  create,
  getAllProducts,
};
