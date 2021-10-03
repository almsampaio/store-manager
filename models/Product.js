const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'products';

const getAll = async () => connection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray())
  // .then((products) => products)
  .catch((err) => {
    console.error(err);
    console.log('-----------------------------------------------------------------------');
  });

const findById = async (id) => {
  const productData = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));

  if (!productData) return null;

  const { name, quantity } = productData;

  return {
    id,
    name,
    quantity,
  };
};

const create = async ({ name, quantity }) => {
  const { insertedId: id } = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne({ name, quantity }));

  return {
    id,
  };
};

module.exports = {
  getAll,
  findById,
  create,
};
