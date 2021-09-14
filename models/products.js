const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find({}).toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products')
    .insertOne({ name, quantity }));

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const update = async (id, name, quantity) => {
  connection()
  .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { id, name, quantity };
  };

const remove = async (id) => {
  const removedItem = await getById(id);
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
    return removedItem;
  };
module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
  remove,
};
