const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products.map(({ _id, name, quantity }) => ({
    _id,
    name,
    quantity,
  }));
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('products').findOne(new ObjectId(id));
  if (!product) return null;
  const { _id, name, quantity } = product;
  return {
    _id,
    name,
    quantity,
  };
};

const update = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db
  .collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  if (!product) return null;
  return {
    _id: id,
    name,
    quantity,
  };
};

const exclude = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await getById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

const create = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
