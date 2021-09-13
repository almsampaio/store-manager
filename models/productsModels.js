const { ObjectId } = require('bson');
const connection = require('./connection');

const getNewProduct = (data) => {
  const { id, name, quantity } = data;
  return { id, name, quantity };
};

const getProductAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const createNewProduct = async (name, quantity) => {
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));
};
const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = db.collection('products').findOne(new ObjectId(id));
  if (!product) return null;
  return product;
};

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne(name);
  if (!product) return null;
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const newData = { name, quantity };
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const update = await db.collection('products').findOneAndUpdate({
    _id: new ObjectId(id),
  },
    { $set: newData },
    { returnOriginal: false });
  if (!update) return null;
  return update;
};
module.exports = {
  createNewProduct,
  findProductByName,
  getProductAll,
  findById,
  updateProduct,
};