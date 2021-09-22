const connection = require('./connection');

const add = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (product) return false;

  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((response) => response.ops[0]);
};
module.exports = {
  add,
};
