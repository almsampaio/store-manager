const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray());

const create = async (sale) => {
  const itensSold = sale;
 const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));

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

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!sale) return null;

  const updatedSale = connection()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return updatedSale;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
};
