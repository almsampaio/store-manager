const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) =>
  connection().then((db) => db.collection('sales').insertOne({ itensSold }));

const findSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) =>
    db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
};

module.exports = { create, findSales, findById, update };
