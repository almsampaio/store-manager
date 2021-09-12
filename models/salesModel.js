const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

const findAll = () =>
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((response) => ({ sales: response }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  return sale;
};

module.exports = {
  create,
  findAll,
  findById,
};
