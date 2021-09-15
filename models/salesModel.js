const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
const productsModel = require('./productsModel');

const salesCollection = async () => mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

const getAllSales = async () => salesCollection().collection('sales').find().toArray();

const getSaleById = async (id) => mongoConnection.getConnection()
      .then((db) => db.collection('products').find({ _id: ObjectId(id) }).toArray());

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
