// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function createSales(sales) {
  await connection().then((db) => db.collection('sales').find().toArray());
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId: _id } = await salesCollection
    .insertOne({ sales });

  return {
    _id,
    itensSold: sales,
  };
}

async function getSales() {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return sales;
}

async function getSaleById(id) {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: id }));

    return sale;
}

module.exports = {
  createSales,
  getSales,
  getSaleById,
};
