const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray());

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;
  
  return product;
};

const create = async (name, quantity) => {
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  const { _id } = await findByName(name);

  return {
    _id,
    name,
    quantity,
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!product) return null;

  return product;
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
};
