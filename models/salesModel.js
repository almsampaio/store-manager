const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
const productsModel = require('./productsModel');

const salesCollection = async () => mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

const getAllSales = async () => {
  const SalesCollection = await salesCollection();
  return SalesCollection.find().toArray();
};

const getSaleById = async (id) => {
  const SalesCollection = await salesCollection();
  return SalesCollection.find({ _id: ObjectId(id) }).toArray();
};

const createSale = async (inputSale) => {
  const SalesCollection = await salesCollection();

    const ret = await SalesCollection
    .insertOne({ itensSold: inputSale }).then((r) => r.ops[0]);

  productsModel.uptadeQuantityOfProduct(inputSale);

  return ret;
};

module.exports = {
  getSaleById,
  getAllSales,
  createSale,
};
