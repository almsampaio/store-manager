const connection = require('./connection');

const COLLECTION_NAME = 'products';

exports.create = async ({ name, quantity }) => {
  const db = await connection();
  const newProduct = await db.collection(COLLECTION_NAME).insertOne({ name, quantity });

  return newProduct;
};

exports.getByName = async (name) => {
  const db = await connection();
  const product = await db.collection(COLLECTION_NAME).findOne({ name });

  return product;
};
