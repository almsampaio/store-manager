const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray());

const create = async (sale) => {
 const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ sale }));

  return {
    _id: newSale.insertedId,
    itensSold: sale,
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!sale) return null;

  return sale;
};

module.exports = {
  getAll,
  create,
  findById,
};
