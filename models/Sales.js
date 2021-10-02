// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function createSales(sales) {
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

async function editSale(id, items) {
  await connection()
    .then((db) => db.collection('sales')
    .findOneAndUpdate({ _id: id }, { $set: { itensSold: items } }));
  
  const editedSale = await getSaleById(id);
  return editedSale;
}

module.exports = {
  createSales,
  getSales,
  getSaleById,
  editSale,
};
