const { ObjectId } = require('bson');
const connection = require('./connection');

const getNewProduct = (data) => {
  const { id, name, quantity } = data;
  return { id, name, quantity };
};

// Cria um novo produto no banco
const createNewProduct = async (name, quantity) => {
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));
};

const getProductAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

// Procura o produto pelo nome
const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne(name);
  if (!product) return null;
  return product;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
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

const deleteProduct = async (id) => {
  const product = await findById(id);
  if (!product) return null;
  const db = await connection();
  db.collection('products').deleteOne({ _id: new ObjectId(id) });
  return product;
};

module.exports = {
  createNewProduct,
  findProductByName,
  getProductAll,
  findById,
  updateProduct,
  deleteProduct,
};