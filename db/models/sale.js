const { ObjectID } = require('mongodb');
const connection = require('../index');

const create = async (data) => {
  const addSale = await connection().then((db) =>
  db.collection('sales').insertOne({ itensSold: data }));
  return addSale.ops[0];
};

const getSales = async () => {
  const sales = await connection().then((db) =>
  db.collection('sales').find().toArray());
  return { sales };
};

const getSale = async (id) => {
  const sale = await connection().then((db) =>
  db.collection('sales').findOne(new ObjectID(id)));
  return sale;
};

const updateSale = async (id, data) => {
  await connection().then((db) =>
  db.collection('sales')
  .findOneAndUpdate({ _id: id }, { $set: { itensSold: data } }, { returnDocument: 'after' }))
  .then((result) => result.value);
};

const deleteSale = async (id) => {
  await connection().then((db) =>
  db.collection('sales').deleteOne({ _id: ObjectID(id) }));
};

module.exports = { create, getSales, getSale, updateSale, deleteSale };
