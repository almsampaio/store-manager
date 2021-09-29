const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = (itensSold) => connection().then((db) =>
  db.collection('sales').insertOne({ itensSold })).then(({ ops }) => ops[0]);

const getAll = () => connection().then((db) =>
  db.collection('sales').find().toArray());

const getById = (id) => connection().then((db) =>
  db.collection('sales').findOne(ObjectID(id)));

const update = (id, itensSold) => connection().then((db) =>
  db.collection('sales').updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }));

const remove = (id) => connection().then((db) =>
  db.collection('sales').findOneAndDelete({ _id: ObjectID(id) }));

const updateStock = (id, quantity) => connection().then((db) =>
  db.collection('products').updateOne({ _id: ObjectID(id) }, { $inc: { quantity } }));

module.exports = { create, getAll, getById, update, remove, updateStock };
