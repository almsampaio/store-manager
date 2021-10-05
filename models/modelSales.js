const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const addSales = async (dataSales) => {
  const salesCollection = await connection()
    .then((db) => db.collection(collection));

  const { insertedId: _id } = await salesCollection.insertOne({
    itensSold: dataSales,
  });

  return {
    _id,
    itensSold: dataSales,
  };
};

const getSales = async () => {
  const sale = {};

  const collectionSales = await connection()
    .then((db) => db.collection(collection));

  sale.sales = await collectionSales.find().toArray();

  return sale;
};

const saleById = async (id) => {
  const salesCollection = await connection()
    .then((db) => db.collection(collection));

    const sale = await salesCollection.findOne({
      _id: ObjectId(id),
    });

    return sale;
};

const updateSale = async (id, saleUpdated) => {
  const { itensSold } = saleUpdated;

  const collectionSales = await connection()
    .then((db) => db.collection(collection));

  const sale = await collectionSales.updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
  );

  return sale;
};

const deleteSale = async (id) => {
  const collectionSales = await connection()
    .then((db) => db.collection(collection));

  const sale = await collectionSales.deleteOne({
    _id: ObjectId(id),
  });

  return sale;
};

module.exports = {
  addSales,
  getSales,
  saleById,
  updateSale,
  deleteSale,
};