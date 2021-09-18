const { ObjectId } = require('bson');
const connection = require('./connection');

const registerSaleModel = async (items) => {
  console.log('registerSaleModel on!');
  const sales = await connection().then((db) => db
  .collection('sales').insertMany([{ itensSold: items }]))
  .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  
  return sales;
};

const getAllSalesModel = async () => {
  const allSales = await connection().then((db) => db
  .collection('sales').find({}).toArray())
  .then((res) => res).catch((err) => console.log(err));
  return allSales;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const query = { _id: ObjectId(id) };
  const saleFound = await connection().then((db) => db
    .collection('sales').findOne(query))
    .then((res) => res).catch((err) => console.log(err));
  return saleFound;
};

module.exports = {
  registerSaleModel,
  getAllSalesModel,
  findById,
};