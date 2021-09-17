const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (products) => {
  const value = await connection()
    .then((db) => db.collection('sales').insertOne(
      { itensSold: products },
    ));
  return value.ops[0];
};

const findSales = async () => {
  const value = await connection()
    .then((db) => db.collection('sales').find({ }).toArray());
  return value;
};

const findSalesId = async (id) => {
  const value = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return value;
};

const updateSale = async (id, product) => {
  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) }, { $set: { itensSold: product } },
    ));
};

const deleteSale = async (id) => {
  await connection()
    .then((db) => db.collection('sales').deleteOne(
      { _id: ObjectId(id) },
    ));
};

module.exports = {
  createSale,
  findSales,
  findSalesId,
  updateSale,
  deleteSale,
};
