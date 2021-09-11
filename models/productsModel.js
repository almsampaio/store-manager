const { ObjectId } = require('bson');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const result = await db.collection('products').find({}).toArray();
  return result;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
};

const getProductByName = async (name) => {
  const db = await getConnection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const createProduct = async (name, quantity) => {
  const db = await getConnection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  const db = await getConnection();
  await db.collection('products').updateOne(
    { _id: id },
    { $set: { name, quantity } },
  );

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  const db = await getConnection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
