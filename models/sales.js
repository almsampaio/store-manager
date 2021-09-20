const { ObjectId } = require('mongodb');

const connection = require('./connection');

const create = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }));

const getAll = async () => connection()
  .then((db) => db.collection('sales').find({}).toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const update = async (id, itensSold) => connection()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

const remove = async (id) => {
  const removedItem = await getById(id);
  connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return removedItem;
}; 

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};