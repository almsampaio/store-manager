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

  productsModel.uptadeQuantityOfProduct(inputSale, 'post');

  return ret;
};

const putSales = async (arraySalesToUpdate, id) => {
  const SalesCollection = await salesCollection();
  // const getP1 = await productsModel.getAllProdutcts();
  // console.log('AAAAAAAAAAAAantes Allproducts', getP1);
  const upt = await SalesCollection
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arraySalesToUpdate } });

  productsModel.uptadeQuantityOfProduct(arraySalesToUpdate, 'put');

  // const getP = await productsModel.getAllProdutcts();
  // console.log('Depois Allproducts', getP);

  // console.log(upt);

  if (!upt) return null;

 return {
    _id: id,
    itensSold: arraySalesToUpdate,

  };
};

const deleteSales = async (id) => {
  const SalesCollection = await salesCollection();
  // const getP1 = await productsModel.getAllProdutcts();
  // console.log('AAAAAAAAAAAAantes Allproducts', getP1);

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
