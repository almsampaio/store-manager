const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'sales';

const addSales = async (salesData) => {
  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await salesCollection.insertOne(
    { itensSold: salesData },
  );

  return { _id, itensSold: salesData };
};

const getSales = async () => {
  const sale = {};

  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  sale.sales = await salesCollection.find().toArray();

  return sale;
};

const getSaleById = async (id) => {
  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  return salesCollection.findOne({ _id: ObjectId(id) });
};

const updateSale = async (id, updatedSale) => {
  const { itensSold } = updatedSale;

  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  return salesCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
  );
};

const deleteSale = async (id) => {
  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  return salesCollection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};