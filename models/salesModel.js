const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) =>
  connection().then((db) => db.collection('sales').insertOne({ itensSold }));

const findSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) =>
    db.collection('sale').findOne({ _id: ObjectId(id) }));
};

module.exports = { create, findSales, findById };
