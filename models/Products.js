const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: newProduct.insertedId, name, quantity };
};

const getByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const update = async (id, data) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: data },
  );
  
  return getById(id);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return getById(id);
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  remove,
};
