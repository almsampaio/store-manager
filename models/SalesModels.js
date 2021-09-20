const { ObjectId } = require('bson');
const connection = require('./connection');

const createNewSales = async (data) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: data }))
  .then((sale) => ({ _id: sale.insertedId, itensSold: data }))
  .catch((e) => e.message);

const getAllSales = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const findById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};
module.exports = { createNewSales, getAllSales, findById };
