const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSale = async (itensSold) => {
  const sales = connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((sale) => sale.ops[0]);
  if (!sales) return null;
  return sales;
};

const getAll = async () => {
  const sales = connection().then((db) =>
    db.collection('sales').find({}).toArray());
  if (!sales) return null;
  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = connection().then((db) =>
    db.collection('sales').findOne(new ObjectId(id)));
  if (!sale) return null;
  return sale;
};

module.exports = { registerSale, getAll, getSaleById };
