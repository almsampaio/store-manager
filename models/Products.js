const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return { products };
};

const getProductByName = async (name) => {
  const db = await connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const create = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  const product = await getProductById(id);
  return product;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const deletedProduct = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });
  return deletedProduct;
};

const updateProductQuantity = async (id, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { quantity } },
  );
};

module.exports = {
  getAll,
  create,
  getProductByName,
  getProductById,
  update,
  deleteProduct,
  updateProductQuantity,
};
