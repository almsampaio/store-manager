const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'products';

exports.create = async ({ name, quantity }) => {
  const db = await connection();
  const { ops: [newProduct] } = await db.collection(COLLECTION_NAME).insertOne({ name, quantity });

  return newProduct;
};

exports.getByName = async (name) => {
  const db = await connection();
  const product = await db.collection(COLLECTION_NAME).findOne({ name });

  return product;
};

exports.getAll = async () => {
  const db = await connection();
  const products = await db.collection(COLLECTION_NAME)
    .find()
    .toArray();

  return products;
};

exports.getById = async (id) => {
  const db = await connection();
  const product = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });

  return product;
};
