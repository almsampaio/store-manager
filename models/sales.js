const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSales = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  return { _id: insertedId, itensSold };
};

const getAllSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return sales;
};

const getOneSale = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sale;
};

module.exports = { registerSales, getAllSales, getOneSale };
