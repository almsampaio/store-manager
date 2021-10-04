const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'products';

const getAll = async () => {
  const products = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).find().toArray())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });

  return products;
};

const getById = async (id) => {
  try {
    const product = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));

    if (!product) return null;

    return product;
  } catch (err) {
    return null;
  }
};

const create = async ({ name, quantity }) => {
  const { ops } = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne({ name, quantity }));

  return ops[0];
};

module.exports = {
  getAll,
  getById,
  create,
};
