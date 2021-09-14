const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // estou validadno o id, nao entendi direito
  
  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const add = async (name, quantity) => {
  const db = await getConnection();
  const addProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: addProduct.insertedId, name, quantity };
};

const getByName = async (name) => {
  const db = await getConnection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  
  const db = await getConnection();
  const updateProduct = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { id: updateProduct.insertedId, name, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const db = await getConnection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  add,
  getById,
  getByName,
  update,
  remove,
};
