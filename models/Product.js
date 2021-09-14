const { ObjectId } = require('mongodb');
const connection = require('./connection');

exports.getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return products;
};

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  return product;
};

exports.findByName = async (productName) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ name: productName });

  return product;
};

exports.createProduct = async ({ name, quantity }) => {
  const db = await connection();

  const product = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};
