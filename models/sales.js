const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSales = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  return { _id: insertedId, itensSold };
};

const findSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return sales;
};

const findSale = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sale;
};

const updateSale = async (id, itensSold) => {
  const update = await connection()
    .then((db) => db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return update;
};

const deleteSale = () => {};

module.exports = {
  addSales,
  findSales,
  findSale,
  updateSale,
  deleteSale,
};
