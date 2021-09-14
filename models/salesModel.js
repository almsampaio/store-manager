const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
  .then((result) => result.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  const sales = await connection()
    .then((db) => db.collection('sales').find({ _id: new ObjectId(id) }).toArray());

  return sales;
};

const update = async (id, Sale) => connection()
  .then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: Sale } },
  ));

module.exports = {
  create,
  getAll,
  getById,
  update,
};
