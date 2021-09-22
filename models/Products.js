const { ObjectId } = require('mongodb');
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

const getProductId = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const result = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  create,
  getAllProducts,
  getProductId,
};
