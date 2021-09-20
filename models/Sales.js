const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (sales) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const setById = (id, sales) => connection()
  .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }))
    .then(() => ({ _id: id, itensSold: sales }));

module.exports = {
  create,
  getAll,
  getById,
  setById,
};
