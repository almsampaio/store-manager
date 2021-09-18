const { ObjectId } = require('bson');
const connection = require('./connection');

const registerSaleModel = async (items) => {
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

const update = async (_id, itensSold) => {
  if (!ObjectId.isValid(_id)) return null;
  await connection().then((db) => db
    .collection('sales').findOneAndUpdate({ 
      _id: ObjectId(_id) }, { $set: { itensSold } }))
    .catch((err) => console.log(err));
  const foundSale = await findById(_id);
  return foundSale;
};

const deleteSaleModel = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const result = await connection().then((db) => db
    .collection('sales').deleteOne({ _id: new ObjectId(_id) }))
    .then((res) => res).catch((err) => console.log(err));
  return result;
};

module.exports = {
  registerSaleModel,
  getAllSalesModel,
  findById,
  update,
  deleteSaleModel,
};