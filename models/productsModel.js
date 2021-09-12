const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  const product = await connection()
  .then((db) => db.collection('products').find({ _id: new ObjectId(id) }).toArray());

  return product;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({
    name,
    quantity,
  }))
  .then((result) => result.ops[0]);

module.exports = {
  getAll,
  getById,
  create,
};
