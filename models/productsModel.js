const { ObjectID } = require('mongodb');
const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connect();
  const result = await db.collection('products').insertOne({ name, quantity });

  return { _id: result.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await connect();
  const result = await db.collection('products').findOne({ name });

  return result;
};

const findAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();

  return products;
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connect();
  const prodruct = await db.collection('products').findOne({ _id: ObjectID(id) });

  return prodruct;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;

  const db = await connect();

  await db.collection('products')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });

    const product = findById(id);
  return product;
};

const excludeProduct = async (id) => {
  if (!ObjectID.isValid(id)) return null;

  const db = await connect();

  const product = await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return product;
};

module.exports = {
  addProduct,
  findByName,
  findAll,
  findById,
  updateProduct,
  excludeProduct,
};
