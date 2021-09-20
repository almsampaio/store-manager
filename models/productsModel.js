// Fazer a query

const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAllProducts = async () => {
  const db = await Connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await Connection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

const createProduct = async (name, quantity) => {
  const db = await Connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  console.log(result.ops[0]);
  return { _id: result.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await Connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;

  const db = await Connection();

  await db.collection('products')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });

    const product = getProductById(id);
  return product;
};

module.exports = { getAllProducts, getProductById, createProduct, findByName, updateProduct }; 
