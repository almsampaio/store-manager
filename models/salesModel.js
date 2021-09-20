const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
const productsModel = require('./productsModel');

const salesCollection = async () => mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

const getAllSales = async () => {
  const SalesCollection = await salesCollection()
    .then((db) => db.find().toArray());

  console.log(SalesCollection, 'ssssssssssssssssssales')

  // console.log('ssssssssale', SalesCollection.find());

  return { sales: SalesCollection };
};

const getSaleById = async (id) => {
  const SalesCollection = await salesCollection();
  return SalesCollection.find({ _id: ObjectId(id) }).toArray();
};

const createSale = async (inputSale) => {
  const SalesCollection = await salesCollection();

    const ret = await SalesCollection
    .insertOne({ itensSold: inputSale }).then((r) => r.ops[0]);

  productsModel.uptadeQuantityOfProduct(inputSale, 'post');

  return ret;
};

const putSales = async (arraySalesToUpdate, id) => {
  const SalesCollection = await salesCollection();
  const upt = await SalesCollection
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arraySalesToUpdate } });
  productsModel.uptadeQuantityOfProduct(arraySalesToUpdate, 'put');
  if (!upt) return null;

 return {
    _id: id,
    itensSold: arraySalesToUpdate,

  };
};

const deleteSales = async (id) => {
  const SalesCollection = await salesCollection();
  const saleWillBeDeleted = await getSaleById(id);
  const dlt = await SalesCollection.deleteOne({ _id: ObjectId(id) });
  if (!dlt) return null;
  productsModel.uptadeQuantityOfProduct(saleWillBeDeleted, 'delete');
  return saleWillBeDeleted[0];
};

module.exports = {
  getSaleById,
  getAllSales,
  createSale,
  putSales,
  deleteSales,
};
