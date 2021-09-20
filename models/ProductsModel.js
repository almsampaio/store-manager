const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const Products = await connection().then((db) => db.collection('products'));
  const newProduct = await Products.insertOne({ name, quantity });

  return newProduct.ops[0];
};

const findByName = async (name) => {
  const Products = await connection().then((db) => db.collection('products'));
  const product = await Products.find({ name }).toArray();

  return product;
};

const getAll = async () => {
  const Products = await connection().then((db) => db.collection('products'));
  const productsList = await Products.find().toArray();

  return productsList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const Products = await connection().then((db) => db.collection('products'));
  const product = await Products.findOne({ _id: ObjectId(id) });

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const Products = await connection().then((db) => db.collection('products'));
  await Products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: ObjectId(id), name, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const Products = await connection().then((db) => db.collection('products'));
  const product = await Products.findOne({ _id: ObjectId(id) });
  await Products.deleteOne({ _id: ObjectId(id) });

  return product;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
  remove,
};
