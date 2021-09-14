const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const itemCreate = await connection()
    .then((db) => db.collection('sales').insertMany([{ itensSold }]));
  return {
    _id: Object.values(itemCreate.insertedIds)[0],
    itensSold,
  };
};

const getAll = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const findById = async (id) => connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const editSale = async (id, itensSold) => {
  const edit = await connection()
  .then((db) => db.collection('sales')
  .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return edit;
};

const deleteId = async (id) => {
    const result = await connection()
   .then((db) => db.collection('sales')
   .findOneAndDelete({ _id: ObjectId(id) }));
   return result;
};

module.exports = {
  create,
  getAll,
  findById,
  editSale,
  deleteId,
};