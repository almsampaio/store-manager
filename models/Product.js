const { ObjectId } = require('mongodb');
const connection = require('./connection');

const zeroIndex = 0;

const create = async (name, quantity) =>
  connection()
    .then((db) =>
      db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[zeroIndex]);

const findByName = async (name) => {
  const query = { name };

  const product = await connection().then((db) =>
    db.collection('products').findOne(query));

  if (!product) return null;

  return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();

  return { products };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));

  if (!productData) return null;

  return productData;
};

const update = async (name, quantity, id) => {
  const db = await connection();
  const newProduct = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    { returnDocument: 'after' },
  );
  return newProduct.value;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const query = { _id: ObjectId(id) };
  const newProduct = await db.collection('products').deleteOne(query);
  return newProduct;
};

module.exports = {
  create,
  findByName,
  getAllProducts,
  findById,
  update,
  deleteProduct,
};